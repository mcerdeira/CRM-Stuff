using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutomathedCaseThings
{
    public class CasePostClosed :IPlugin
    {
        private string unsecureconfig;
        private string secureconfig;

        public CasePostClosed(string unsecure, string secure)
        {
            this.secureconfig = secure;
            this.unsecureconfig = unsecure;
        }

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.InputParameters.Contains("IncidentResolution") && context.InputParameters["IncidentResolution"] is Entity)
            {
                Entity entity = (Entity)context.InputParameters["IncidentResolution"];                
                if (entity.LogicalName == "incidentresolution")
                {
                    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                    Entity incident = GetCase(((EntityReference)entity.Attributes["incidentid"]).Id, service);

                    EntityReference owner = (EntityReference)incident.Attributes["ownerid"];
                    // Get activities related data
                    string description = GetActivities(new Guid(incident.Attributes["incidentid"].ToString()), service);
                    description += String.Format("<br/> Horas {0}", (((int)entity.Attributes["timespent"]) / 60.00).ToString());
                    string subject = String.Format("Detalle de {0} Cerrado", incident.Attributes["title"].ToString());

                    // Send mail with details
                    Entity mail = BuildEmail(owner.Id, context.UserId, subject, description, owner.LogicalName);                    
                    service.Create(mail);
                }
            }
        }

        private Entity GetCase(Guid caseId, IOrganizationService service)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "incident";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("incidentid");
            qe.ColumnSet.Columns.Add("ownerid");
            qe.ColumnSet.Columns.Add("title");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "incidentid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(caseId);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

             return (Entity)result.Entities[0];
        }

        private String GetActivities(Guid id, IOrganizationService service)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "activitypointer";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("activityid");
            qe.ColumnSet.Columns.Add("regardingobjectid");
            qe.ColumnSet.Columns.Add("subject");
            qe.ColumnSet.Columns.Add("actualdurationminutes");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "regardingobjectid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(id);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

            string textresult = "";
            double duration = 0;
            for (int i = 0; i < result.Entities.Count; i++)
            {
                duration = 0;
                if (result.Entities[i].Attributes.Contains("actualdurationminutes"))
                {
                    duration = ((int)result.Entities[i].Attributes["actualdurationminutes"]) / 60.00;
                }
                textresult += String.Format("{0} : {1}{2}", result.Entities[i].Attributes["subject"].ToString(), duration, "<br/>");
            }
            return textresult;
        }


        private Entity BuildEmail(Guid id, Guid currentUserId, string subject, string description, string entitytype)
        {
            Entity mail = new Entity("email");
            mail.Attributes["from"] = Party(currentUserId, "systemuser");
            mail.Attributes["to"] = Party(id, entitytype, "martincerdeira@gmail.com");
            mail.Attributes["subject"] = subject;
            mail.Attributes["description"] = description;
            return mail;
        }

        private EntityCollection Party(Guid id, string entitytype, string cc = "")
        {
            Entity party = new Entity("activityparty");
            party["partyid"] = new EntityReference(entitytype, id);
            //party["addressused"] = "some@email.com";

            EntityCollection col = new EntityCollection();
            col.Entities.Add(party);
            if (cc != "")
            {
                // This is an unresolved party
                Entity party2 = new Entity("activityparty");
                party2["addressused"] = cc;
                col.Entities.Add(party2);
            }
            return col;
        }
    }
}
