using AxxCrm;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;

namespace CRMPlugin_NS
{


    public class CRMPlugin_YourPluginClassName : AxxPlugin, IPlugin
    {
        public CRMPlugin_YourPluginClassName(string unsecureConfig, string secureConfig) : base(unsecureConfig, secureConfig) { }
        public override void Execute(IServiceProvider serviceProvider)
        {
            base.Execute(serviceProvider);
            try
            {
                /*
                 your code here
                 */
            }

            catch (Exception e)
            {
                throw new InvalidPluginExecutionException(e.Message);
            }
        }
    }
}
