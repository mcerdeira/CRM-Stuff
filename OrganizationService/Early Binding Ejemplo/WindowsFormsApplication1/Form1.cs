using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

/*
 * Ejemplo usando Early Binding y Xrm.Tooling
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
            Contact c = new Contact();
            c.FirstName = "Martincho";
            c.LastName = "Cerdeira";

            var id = svc.Create(c);            
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string cns = ConfigurationManager.ConnectionStrings["CrmConnection"].ConnectionString;
            CrmServiceClient svc = new CrmServiceClient(cns);     
            OrganizationServiceContext serviceContext = new OrganizationServiceContext(svc);

            var q = from a in serviceContext.CreateQuery<Account>()
                    where a.Name != "A. Datu"
                    select new Account
                    {
                        Name = a.Name
                    };


            int i = 5;
            foreach (Account ac in q)
            {
                MessageBox.Show(ac.Name);
                i--;
                if (i <= 0)
                {
                    break;
                }
            }
        }
    }
}
