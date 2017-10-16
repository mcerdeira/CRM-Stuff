using ContactManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using Microsoft.Xrm.Tooling.Connector;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk;
using System.Net;

namespace ContactManager.Services
{
    public class ContactRepository
    {
        private CrmServiceClient CRMSvc;

        public ContactRepository()
        {
            string cns = ConfigurationManager.ConnectionStrings["CrmConnection"].ConnectionString;
            CRMSvc = new CrmServiceClient(cns);
            //CRMSvc = new CrmServiceClient(CredentialCache.DefaultNetworkCredentials, Microsoft.Xrm.Tooling.Connector.AuthenticationType.Office365, "https://axxonconsulting6.api.crm2.dynamics.com/XRMServices/2011/Organization.svc", "80", "orgb308aa6e");
        }

        public bool SaveContact(Contact contact)
        {
            Entity ent = new Entity("account");
            ent["name"] = contact.Name;
            CRMSvc.Create(ent);
            return true;
        }

        public List<Contact> GetContactByName(string criteria)
        {
            List<Contact> contacts = new List<Contact>();
            ConditionExpression con = new ConditionExpression();
            con.AttributeName = "name";
            con.Operator = ConditionOperator.Like;
            criteria = String.Format("%{0}%", criteria);
            con.Values.Add(criteria);

            FilterExpression fil = new FilterExpression();
            fil.Conditions.Add(con);

            QueryExpression qe = new QueryExpression();
            qe.EntityName = "account";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("name");
            qe.ColumnSet.Columns.Add("accountid");
            qe.Criteria.AddFilter(fil);

            EntityCollection result = CRMSvc.RetrieveMultiple(qe);
            for (int i = 0; i < result.Entities.Count; i++)
            {                
                Contact contact = new Contact();
                contact.Id = result.Entities[i].Attributes["accountid"].ToString();
                contact.Name = result.Entities[i].Attributes["name"].ToString();
                contacts.Add(contact);
            }
            return contacts;
        }

        public List<Contact> GetContactList(string id = null)
        {
            List<Contact> contacts = new List<Contact>();
            Guid guid;

            QueryExpression qe = new QueryExpression();
            qe.EntityName = "account";
            qe.ColumnSet = new ColumnSet();
            qe.ColumnSet.Columns.Add("name");
            qe.ColumnSet.Columns.Add("accountid");
            if (id != null && Guid.TryParse(id, out guid))
            {
                ConditionExpression con = new ConditionExpression();                
                con.AttributeName = "accountid";
                con.Operator = ConditionOperator.Equal;
                con.Values.Add(id);

                FilterExpression fil = new FilterExpression();
                fil.Conditions.Add(con);
                qe.Criteria.AddFilter(fil);
            }

            EntityCollection result = CRMSvc.RetrieveMultiple(qe);
            for (int i = 0; i < result.Entities.Count; i++)
            {
                Contact contact = new Contact();
                contact.Id = result.Entities[i].Attributes["accountid"].ToString();
                contact.Name = result.Entities[i].Attributes["name"].ToString();
                contacts.Add(contact);
            }
            return contacts; 
        }
    }
}