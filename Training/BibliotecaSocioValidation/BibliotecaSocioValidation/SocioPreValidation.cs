using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaSocioValidation
{
    public class SocioPreValidation : IPlugin
    {
        private string unsecureconfig;
        private string secureconfig;

        public SocioPreValidation(string unsecure, string secure)
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
                if (entity.LogicalName == "new_socio")
                {
                    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                    string socio_name = DniExists(service, (int)entity.Attributes["new_dni"]);
                    if (socio_name != "")
                    {
                        entity.Attributes["dni"] = 0;
                        throw new Exception(String.Format("El DNI existe en {0}", socio_name));
                    }
                    else 
                    {
                        int nro_socio = NextNroSocio(service);
                        entity.Attributes["new_nrodesocio"] = nro_socio;
                    }
                }
            }
        }

        private int NextNroSocio(IOrganizationService service)
        {
            string fetchXml = @"<fetch version='1.0' aggregate = 'true' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='new_socio'>                    
                    <attribute name='new_nrodesocio' 
                               alias = 'nrosocioSum'
                               aggregate = 'sum'/>
                  </entity>
                </fetch>";

            int nextNro = 1;
            EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (result.Entities.Count > 0)
            {
                if(((AliasedValue)result.Entities[0].Attributes["nrosocioSum"]).Value != null)
                {
                    nextNro = (int)((AliasedValue)result.Entities[0].Attributes["nrosocioSum"]).Value + 1;
                }
            }
            return nextNro;
        }

        private string DniExists(IOrganizationService service, int dni)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "new_socio";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("new_name");
            qe.ColumnSet.Columns.Add("new_dni");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "new_dni";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(dni);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection result = service.RetrieveMultiple(qe);

            if (result.Entities.Count > 0)
            {
                return result.Entities[0].Attributes["new_name"].ToString();
            }
            else
            {
                return "";
            }
        }
    }
}
