using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace SurveyMetadataUpdater
{
    public class SurveyPostUpdateEvent : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                if (entity.LogicalName == "msdyn_survey")
                {
                    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                    Entity survey = GetSurvey((Guid)entity.Attributes["msdyn_surveyid"], service);
                    if (survey != null)
                    {
                        GetNoteEntity(((Guid)entity.Attributes["msdyn_surveyid"]), service, survey.Attributes["msdyn_name"].ToString());
                    }
                }
            }
        }

        private Entity GetSurvey(Guid id, IOrganizationService service)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "msdyn_survey";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("msdyn_surveyid");
            qe.ColumnSet.Columns.Add("msdyn_name");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "msdyn_surveyid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(id);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

            if (result.Entities.Count > 0)
            {
                return (Entity)result.Entities[0];
            }
            else
            {
                return null;
            }
        }

        private void GetNoteEntity(Guid id, IOrganizationService service, string name)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "annotation";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("filename");
            qe.ColumnSet.Columns.Add("subject");
            qe.ColumnSet.Columns.Add("documentbody");
            qe.ColumnSet.Columns.Add("annotationid");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "objectid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(id);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);            
            if (result.Entities.Count > 0)
            {
                Clean(id, service);
            }

            string xml_content = "";        
            for (int i = 0; i < result.Entities.Count; i++)
            {
                string filename = result.Entities[i].Attributes["filename"].ToString();
                string documentbody = result.Entities[i].Attributes["documentbody"].ToString();
                if (filename.Contains(name) || filename != "Traducciones.xml")
                {
                    xml_content = Encoding.Unicode.GetString(Convert.FromBase64String(documentbody));
                }
            }
            if (xml_content != "")
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(xml_content);

                XmlNodeList elemList = doc.GetElementsByTagName("question");
                for (int i = 0; i < elemList.Count; i++)
                {
                    if (elemList[i].ParentNode.ParentNode.Attributes["s.name"] != null)
                    {
                        string questionId = elemList[i].Attributes["Id"].Value;
                        string surveyId = id.ToString();
                        string pageId = elemList[i].ParentNode.ParentNode.ParentNode.Attributes["Id"].Value;
                        string sectionId = elemList[i].ParentNode.ParentNode.Attributes["Id"].Value;
                        string s_name = String.Format("{0} Metadata, Pregunta: {1}", name, i + 1);
                        SaveEntity(service, questionId, surveyId, pageId, sectionId, s_name);                    
                    }
                }
            }
        }

        private void Clean(Guid surveyid, IOrganizationService service)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "axx_surveymetadata";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("axx_survey");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "axx_survey";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(surveyid);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

            for (int i = 0; i < result.Entities.Count; i++)
            {
                try
                {
                    Guid Id = Guid.Parse(result.Entities[i].Attributes["axx_surveymetadataid"].ToString());
                    service.Delete("axx_surveymetadata", Id);
                }
                catch (Exception ex)
                { 
                    //pass
                }
            }
        }

        private void SaveEntity(IOrganizationService service, string questionId, string surveyId, string pageId, string sectionId, string name)
        {
            if (questionId.Trim() != "" && surveyId.Trim() != "" && pageId.Trim() != "" && sectionId.Trim() != "")
            {
                try
                {
                    Entity surveymeta = new Entity("axx_surveymetadata");
                    surveymeta.Attributes["axx_question"] = new EntityReference("msdyn_question", Guid.Parse(questionId));
                    surveymeta.Attributes["axx_survey"] = new EntityReference("msdyn_survey", Guid.Parse(surveyId));
                    surveymeta.Attributes["axx_page"] = new EntityReference("msdyn_page", Guid.Parse(pageId));
                    surveymeta.Attributes["axx_section"] = new EntityReference("msdyn_section", Guid.Parse(sectionId));
                    surveymeta.Attributes["axx_name"] = name;
                    service.Create(surveymeta);
                }
                catch(Exception ex)
                { 
                    //pass
                }
            }
        }
    }
}
