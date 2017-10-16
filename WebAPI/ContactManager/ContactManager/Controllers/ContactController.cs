using ContactManager.Models;
using ContactManager.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactManager.Controllers
{
    public class ContactController : ApiController
    {
        private ContactRepository contactrepo;

        public ContactController()
        {
            this.contactrepo = new ContactRepository();
        }

        [HttpGet]
        public List<Contact> Get()
        {
            return contactrepo.GetContactList();
        }

        [HttpGet]
        public List<Contact> Get(string id)
        {
            return contactrepo.GetContactList(id);
        }

        [HttpGet]
        public List<Contact> GetByName(string criteria)
        {
            return contactrepo.GetContactByName(criteria);
        }

        [HttpPost]
        public IHttpActionResult Post(Contact contact)
        {
            contactrepo.SaveContact(contact);
            return Ok();
        }
    }
}
