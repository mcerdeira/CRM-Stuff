// JScript source code 
function LetterOnLoad() { 
    var context = Xrm.Page.context; 
    var serverUrl = context.getServerUrl(); 
    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc"; 
    var CRMObject = new Object(); 
    ///////////////////////////////////////////////////////////// 
    // Specify the ODATA entity collection 
    var ODATA_EntityCollection = "/AccountSet"; 
    ///////////////////////////////////////////////////////////// 
    // Define attribute values for the CRM object you want created 
    CRMObject.Name = "TEST"; 
    CRMObject.Telephone1 = "123"; 
    CRMObject.Fax = "456"; 
    //Parse the entity object into JSON 
    var jsonEntity = JSON.stringify(CRMObject); 
    //Asynchronous AJAX function to Create a CRM record using OData 
    $.ajax({ type: "POST", 
        contentType: "application/json; charset=utf-8", 
        datatype: "json", 
        url: serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection, 
        data: jsonEntity, 
        beforeSend: function (XMLHttpRequest) { 
            //Specifying this header ensures that the results will be returned as JSON. 
            XMLHttpRequest.setRequestHeader("Accept", "application/json"); 
        }, 
        success: function (data, textStatus, XmlHttpRequest) { 
            alert("success"); 
            var NewCRMRecordCreated = data["d"]; 
            alert("CRM GUID created: " + NewCRMRecordCreated.AccountId); 
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            alert("failure"); 
        } 
    }); 
}
