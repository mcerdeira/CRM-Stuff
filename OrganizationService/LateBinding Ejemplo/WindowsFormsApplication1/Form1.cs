using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Tooling.Connector;
using System.Configuration;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Client;

/*
 * Ejemplo usando Late Binding y Xrm.Tooling
 * Target .NET 4.5.2
 * Revisar ConnectionString
 * SDK Assemblies: Desde NuGet
 */

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string cns = ConfigurationManager.ConnectionStrings["CrmConnection"].ConnectionString;
            CrmServiceClient svc = new CrmServiceClient(cns);
            Entity contact = BuildContact();
            var id = svc.Create(contact);
        }

        static Entity BuildContact()
        {
            Entity ent = new Entity("contact");
            ent["firstname"] = "Martin";
            ent["lastname"] = "Cerdeira";
            return ent;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string cns = ConfigurationManager.ConnectionStrings["CrmConnection"].ConnectionString;
            CrmServiceClient svc = new CrmServiceClient(cns);

            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "name";
            con.Operator = ConditionOperator.NotEqual;
            con.Values.Add("A. Datu");

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);

            QueryExpression qe = new QueryExpression();
            qe.EntityName = "account";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("name");
            qe.Criteria.AddFilter(fil);

            EntityCollection result = svc.RetrieveMultiple(qe);

            int ii = 5;

            for (int i = 0; i < result.Entities.Count; i++)
            {
                MessageBox.Show(result.Entities[i].Attributes.Values.ToList()[0].ToString());
                ii--;
                if (ii <= 0)
                {
                    break;
                }
            }
        }
    }
}
