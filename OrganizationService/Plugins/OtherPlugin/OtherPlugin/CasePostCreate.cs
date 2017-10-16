using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OtherPlugin
{
    public class CasePostCreate : IPlugin 
    {
        private string unsecureconfig;
        private string secureconfig;

        public CasePostCreate(string unsecure, string secure)
        {
            this.secureconfig = secure;
            this.unsecureconfig = unsecure;
        }

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {                
                Entity entity = (Entity)context.InputParameters["Target"];
                if (entity.LogicalName == "incident")
                {
                    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                    EntityReference customer = (EntityReference)entity.Attributes["customerid"];

                    string name = GetContactName(customer.Id, service);
                    Entity mail = BuildEmail(customer.Id, context.UserId, name, customer.LogicalName);
                    service.Create(mail);                    
                }
            }
        }

        private String GetContactName(Guid id, IOrganizationService service)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "account";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("name");
            qe.ColumnSet.Columns.Add("accountid");

            ConditionExpression con = new ConditionExpression();                
            con.AttributeName = "accountid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(id);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

            return result.Entities[0].Attributes["name"].ToString();
        }

        private Entity BuildEmail(Guid id, Guid currentUserId, string name, string entitytype)
        {
            Entity mail = new Entity("email");
            mail.Attributes["from"] = Party(currentUserId, "systemuser");
            mail.Attributes["to"] = Party(id, entitytype, "martincerdeira@gmail.com");
            mail.Attributes["subject"] = String.Format("Hello {0}", name);
            mail.Attributes["description"] = "Hello world!";
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
