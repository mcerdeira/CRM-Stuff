// <copyright file="PreOperationcontactCreate.cs" company="">
// Copyright (c) 2017 All Rights Reserved
// </copyright>
// <author></author>
// <date>8/15/2017 1:02:23 PM</date>
// <summary>Implements the PreOperationcontactCreate Plugin.</summary>
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.1
// </auto-generated>

using System;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;

namespace UsingDeveloperToolkit
{

    /// <summary>
    /// PreOperationcontactCreate Plugin.
    /// </summary>    
    public class PreOperationcontactCreate: PluginBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PreOperationcontactCreate"/> class.
        /// </summary>
        /// <param name="unsecure">Contains public (unsecured) configuration information.</param>
        /// <param name="secure">Contains non-public (secured) configuration information. 
        /// When using Microsoft Dynamics 365 for Outlook with Offline Access, 
        /// the secure string is not passed to a plug-in that executes while the client is offline.</param>
        public PreOperationcontactCreate(string unsecure, string secure)
            : base(typeof(PreOperationcontactCreate))
        {
            
           // TODO: Implement your custom configuration handling.
        }


        /// <summary>
        /// Main entry point for he business logic that the plug-in is to execute.
        /// </summary>
        /// <param name="localContext">The <see cref="LocalPluginContext"/> which contains the
        /// <see cref="IPluginExecutionContext"/>,
        /// <see cref="IOrganizationService"/>
        /// and <see cref="ITracingService"/>
        /// </param>
        /// <remarks>
        /// For improved performance, Microsoft Dynamics 365 caches plug-in instances.
        /// The plug-in's Execute method should be written to be stateless as the constructor
        /// is not called for every invocation of the plug-in. Also, multiple system threads
        /// could execute the plug-in at the same time. All per invocation state information
        /// is stored in the context. This means that you should not use global variables in plug-ins.
        /// </remarks>
        protected override void ExecuteCrmPlugin(LocalPluginContext localContext)
        {
            if (localContext == null)
            {
                throw new InvalidPluginExecutionException("localContext");
            }

            IPluginExecutionContext context = localContext.PluginExecutionContext;
            if (context.InputParameters.Contains("Target"))
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                if (entity.LogicalName == "contact")
                {
                    if (!entity.Attributes.Contains("jobtitle"))
                    {
                        entity.Attributes.Add("jobtitle", "Prueba");
                    }
                    else
                    {
                        entity.Attributes["jobtitle"] = "Prueba";
                    }
                    entity.Attributes["firstname"] = "Maria " + entity.Attributes["firstname"];
                    entity.Attributes["fullname"] = String.Format("{0} {1}", entity.Attributes["firstname"], entity.Attributes["lastname"]);
                }
            }
        }
    }
}
