function Alerter()
{
     var accountFetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
      "<entity name='contact'>" +
        "<attribute name='fullname' />" +
        "<attribute name='telephone1' />" +
        "<attribute name='contactid' />" +
        "<order attribute='fullname' descending='false' />" +
        "<filter type='and'>" +
          "<condition attribute='lastname' operator='eq' value='" + Xrm.Page.getAttribute("name").getValue() + "' />" +
        "</filter>" +
      "</entity>" +
    "</fetch>";
    
    /*
    var name = Xrm.Page.getAttribute("name").getValue();
    var accountFetchXML2 = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" 
      "<entity name='contact'>" 
        "<attribute name='fullname' />" 
        "<attribute name='telephone1' />" 
        "<attribute name='contactid' />" 
        "<order attribute='fullname' descending='false' />" 
        "<filter type='and'>" 
          "<condition attribute='lastname' operator='eq' value='${name}' />" 
        "</filter>" 
      "</entity>" 
    "</fetch>`
    */
        
    var fetch = encodeURI(accountFetchXML);
    var entityname = "contacts";
    var serverURL = Xrm.Page.context.getClientUrl();
    var Query = entityname + "?fetchXml=" + fetch;
    var req = new XMLHttpRequest();    
    req.open("GET", serverURL + "/api/data/v8.0/" + Query, false);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.send();
    if (4 == req.readyState /* complete */) {
    req.onreadystatechange = null;
        if (200 == req.status) {
            var results = JSON.parse(req.response);
            for (var i = 0; i < results.value.length; i++) { 
                var accountDetails = results.value[i];
                return accountDetails;
            }
        }
        else {
            alert(req.statusText);
        }
    }
}