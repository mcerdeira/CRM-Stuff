using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Activities;
using Microsoft.Xrm.Sdk.Workflow;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Workflow_Activity
{

    public sealed class MyActivity : CodeActivity
    {
        [Input("Account")]
        [ReferenceTarget("account")]
        public InArgument<EntityReference> account { get; set; }

        [Output("Process result")]
        public OutArgument<bool> Ok { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            IWorkflowContext wf_context = context.GetExtension<IWorkflowContext>();            
            IOrganizationServiceFactory svcfactory = context.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = svcfactory.CreateOrganizationService(wf_context.UserId);

            EntityReference account_ref = this.account.Get(context); // the same context.GetValue(this.account)
            Entity account = GetAccount(service, account_ref.Id);
            account.Attributes["name"] = "Pepelepew";
            service.Update(account);
            this.Ok.Set(context, true);
        }

        private Entity GetAccount(IOrganizationService service, Guid id)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "account";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("name");

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "accountid";
            con.Operator = ConditionOperator.Equal;
            con.Values.Add(id);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);
            qe.Criteria.AddFilter(fil);

            EntityCollection account = service.RetrieveMultiple(qe);

            return account.Entities[0];
        }
    }
}
