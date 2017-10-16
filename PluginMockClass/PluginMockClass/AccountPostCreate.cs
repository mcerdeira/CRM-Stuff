using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PluginMockClass
{
    public class AccountPostCreate : IPlugin 
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                if (entity.LogicalName == "account")
                {
                    if (entity.Attributes.Contains("accountnumber") == false)
                    {
                        Random rndgen = new Random();
                        string accountnumber = rndgen.Next().ToString();
                        entity.Attributes.Add("accountnumber", accountnumber);
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
