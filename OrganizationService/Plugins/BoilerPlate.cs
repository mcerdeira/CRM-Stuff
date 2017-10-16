namespace OtherPlugin
{
    class CasePostCreate : IPlugin 
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
                if (entity.LogicalName == "YOUR_ENTITY")
                {
                    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                    
                    
                }
            }
        }
    }
}
