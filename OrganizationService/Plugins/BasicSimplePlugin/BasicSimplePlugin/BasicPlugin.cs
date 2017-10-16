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
    }
}
