using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;

namespace AxxCrm
{
    public class AxxPlugin
    {
        #region Secure/Unsecure Configuration Setup
        private string _secureConfig = null;
        private string _unsecureConfig = null;
        internal Entity entity;
        internal IOrganizationService service;
        internal IPluginExecutionContext context;
        internal IServiceProvider serviceProvider;

        public virtual void Execute(IServiceProvider serviceProvider)
        {
            try
            {
                this.serviceProvider = serviceProvider;
                ITracingService tracer = (ITracingService)this.serviceProvider.GetService(typeof(ITracingService));
                context = (IPluginExecutionContext)this.serviceProvider.GetService(typeof(IPluginExecutionContext));
                IOrganizationServiceFactory factory = (IOrganizationServiceFactory)this.serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                service = factory.CreateOrganizationService(context.UserId);
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                    entity = (Entity)context.InputParameters["Target"]; // always ?
            }
            catch (Exception e)
            {
                throw new InvalidPluginExecutionException(e.Message);
            }
        }
        #endregion
        public AxxPlugin(string unsecureConfig, string secureConfig)
            : base()
        {
            _secureConfig = secureConfig;
            _unsecureConfig = unsecureConfig;

        }
        internal void SetValue(string attributeName, object value)
        {
            SetValue(entity, attributeName, value);
        }
        internal void SetValue(string attributeName, EntityReference value)
        {
            SetValue(entity, attributeName, value);
        }
        internal void Update()
        {
            Update(this.entity);
        }
        internal void Update(Entity entity)
        {
            service.Update(entity);
        }
        internal void SetValue(Entity entity, string attributeName, EntityReference value)
        {
            SetValue(entity, attributeName, value);
        }
        internal void SetValue(string attributeName, Entity value)
        {
            SetValue(entity, attributeName, value);
        }
        /// <summary>
        /// Only EntityReference
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="attributeName"></param>
        /// <param name="value"></param>
        internal void SetValue(Entity entity, string attributeName, Entity value)
        {
            var _value = new EntityReference(value.LogicalName, value.Id);
            SetValue(entity, attributeName, _value);
        }
        internal void SetValue(Entity entity, string attributeName, object value)
        {
            if (HasAttribute(entity, attributeName))
                entity.Attributes[attributeName] = value;
            else
                entity.Attributes.Add(attributeName, value);
        }

        internal T GetAttribute<T>(string attributeName)
        {
            return
                (T)Convert.ChangeType(
                GetAttribute<object>(entity, attributeName)
                , typeof(T));
        }
        internal T GetAttribute<T>(Entity entity, string attributeName)
        {
            if (HasAttribute(attributeName))
                return (T)Convert.ChangeType(entity.Attributes[attributeName], typeof(T));
            else
                return default(T);
        }
        internal bool HasAttribute(string attributeName)
        {
            return HasAttribute(this.entity, attributeName);
        }
        internal bool HasAttribute(Entity entity, string attributeName)
        {
            return entity.Attributes.ContainsKey(attributeName);
        }
        internal bool ValidateTarget()
        {
            return (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity);
        }
        internal Entity GetFirstRecord(string fetchXML, params string[] values)
        {
            Entity output = null;
            EntityCollection ECOL = new EntityCollection();
            ECOL = service.RetrieveMultiple(new FetchExpression(string.Format(fetchXML, values)));
            if (ECOL != null)
            {
                if (ECOL.Entities.Count > 0)
                    output = ECOL.Entities[0];
            }
            return output;
        }
        internal T GetScalar<T>(string fetchXML, string columnName, params string[] values)
        {
            Entity ent = GetFirstRecord(fetchXML, values);
            if (ent == null)
                return default(T);
            else
            {
                object _val = GetAttribute<object>(ent, columnName);
                return _val == null ? default(T) : (T)Convert.ChangeType(_val, typeof(T));
            }
        }
        internal EntityCollection GetEntityCollection(string fetchXML, params string[] values)
        {
            return service.RetrieveMultiple(new FetchExpression(string.Format(fetchXML, values)));
        }
        internal EntityReference GetEntityReference(string attributeName)
        {
            return GetEntityReference(entity, attributeName);
        }
        internal EntityReference GetEntityReference(Entity entity, string attributeName)
        {
            EntityReference output = null;
            try
            {
                return (EntityReference)entity.Attributes[attributeName];
            }
            catch (Exception ex)
            {
                Console.Write("GetEntityReference: " + ex.Message);
            }
            return output;
        }
    }
}
