using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

/*
  Necesita subscripcion a Azure
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
            string clientID = "0a31fc25-fb7d-4adf-9491-6a9f788fdbe4";
            string clientSecret = "10037FFE8B4B78B5";
            Uri redirectUri = new Uri("https://sts.windows.net/025f3ef2-38d8-44ff-a071-678969af2e7c/");
            
            Uri uri = new Uri("https://axxonconsulting6.api.crm2.dynamics.com/api/data/v8.2/");

            
            ClientAssertion ca = new ClientAssertion(clientID, clientSecret);
            
            AuthenticationParameters ap = AuthenticationParameters.CreateFromResourceUrlAsync(uri).Result;
            AuthenticationContext ac = new AuthenticationContext(ap.Authority);
            AuthenticationResult ar = ac.AcquireTokenAsync(ap.Resource, ca).Result;

            string token = ar.AccessToken;
            textBox1.Text = token;


        }
    }
}
