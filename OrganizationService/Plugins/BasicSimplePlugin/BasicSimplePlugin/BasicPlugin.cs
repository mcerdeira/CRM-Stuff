using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicSimplePlugin
{
    // Class must be public, in order to see it when registering the assembly!
    // Remember to sign the assembly!

    public class BasicPlugin: IPlugin
    {
        private string unsecureconfig;
        private string secureconfig;

        public BasicPlugin(string unsecure, string secure)
        {
            this.secureconfig = secure;
            this.unsecureconfig = unsecure;
        }

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                // Obtain the target entity from the input parameters.
                Entity entity = (Entity)context.InputParameters["Target"];
                // Check if the entity is "account"
                if (entity.LogicalName == "account")
                {
                    // An accountnumber attribute should not already exist because
                    // it is system generated.
                    if (entity.Attributes.Contains("accountnumber") == false)
                    {
                        // Create a new accountnumber attribute, set its value, and add
                        // the attribute to the entity's attribute collection.
                        Random rndgen = new Random();
                        string accountnumber = rndgen.Next().ToString();
                        entity.Attributes.Add("accountnumber", accountnumber);
                        entity.Attributes["name"] = String.Format("{0} - {1}", this.secureconfig, this.unsecureconfig);
                    }
                    else
                    {
                        throw new InvalidPluginExecutionException("The account number can only be set by the system.");
                    }
                }
            }
        }
		
		private Guid GetSolicitud(Guid id, IOrganizationService service)
        {
            string fetch2 = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>";
            fetch2 += "<entity name='opportunity'>";
            fetch2 += "<attribute name='name' /> ";
            fetch2 += "<attribute name='customerid' /> ";
            fetch2 += "<attribute name='estimatedvalue' /> ";
            fetch2 += "<attribute name='statecode' /> ";
            fetch2 += "<attribute name='statuscode' /> ";
            fetch2 += "<attribute name='pnet_recordcommitteeid' />";
            fetch2 += "<order attribute='name' descending='false' />";
            fetch2 += "<filter type='and'>";
            fetch2 += "<condition attribute='parentcontactid' operator='eq' uitype='contact' value='{" + id.ToString()+ "}' />";
            fetch2 += "<condition attribute='statecode' operator='eq' value='0' />";
            fetch2 += "<condition attribute='statuscode' operator='not-in'>";
            fetch2 += "<value>102610005</value>";
            fetch2 += "<value>102610004</value>";
            fetch2 += "<value>102610006</value>";
            fetch2 += "</condition>";
            fetch2 += "</filter>";
            fetch2 += "</entity>";
            fetch2 += "</fetch>";

            EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetch2));
            if (result.Entities.Count > 0)
            {
                return ((EntityReference)result.Entities[0].Attributes["pnet_recordcommitteeid"]).Id;
            }
            else
            {
                return Guid.Empty;
            }
        }		
    }
}
