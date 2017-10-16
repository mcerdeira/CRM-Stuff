using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevolucionCustomAction
{
    public class DevolicionPre : IPlugin 
    {
        private string unsecureconfig;
        private string secureconfig;

        public DevolicionPre(string unsecure, string secure)
        {
            this.secureconfig = secure;
            this.unsecureconfig = unsecure;
        }

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.InputParameters.Contains("Alquiler") && context.InputParameters["Alquiler"] is EntityReference)
            {
                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
               
                EntityReference alquiler_ref = (EntityReference)context.InputParameters["Alquiler"];
                Entity alquiler = GetAlquiler(alquiler_ref.Id, service);
                alquiler.Attributes["new_name"] = "Pikachu";
                service.Update(alquiler);
                context.OutputParameters["DevolucionOK"] = true;
            }
        }

        private Entity GetAlquiler(Guid id, IOrganizationService service)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "new_alquiler";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("new_name");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "new_alquilerid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(id);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

            return result.Entities[0];
        }
    }
}
