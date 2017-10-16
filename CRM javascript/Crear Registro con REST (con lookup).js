function ExecCreate() { 
    var gridControl = document.getElementById("Unidades_Operativas").control;
    var ids = gridControl.get_selectedIds(); 	
    var context = Xrm.Page.context; 
    var serverUrl = context.getServerUrl(); 
    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc"; 
    var CRMObject = new Object();
    ///////////////////////////////////////////////////////////// 
    // Specify the ODATA entity collection 
    var ODATA_EntityCollection = "/new_trigger_wsSet"; 
    ///////////////////////////////////////////////////////////// 
    // Define attribute values for the CRM object you want created 
    CRMObject.new_name = "TEST";
    CRMObject.new_uo = {
    __metadata: { type: "Microsoft.Crm.Sdk.Data.Services.EntityReference" },
    Id: ids[0],
    LogicalName: "new_unidadesoperativas"};
	
    //Parse the entity object into JSON 
    var jsonEntity = JSON.stringify(CRMObject); 
    //Asynchronous AJAX function to Create a CRM record using OData 
    $.ajax({ type: "POST", 
        contentType: "application/json; charset=utf-8", 
        datatype: "json", 
        url: serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection, 
        data: jsonEntity, 
		async: false,
        beforeSend: function (XMLHttpRequest) { 
            //Specifying this header ensures that the results will be returned as JSON. 
            XMLHttpRequest.setRequestHeader("Accept", "application/json"); 
        }, 
        success: function (data, textStatus, XmlHttpRequest) { 
            alert("success"); 
            var NewCRMRecordCreated = data["d"]; 
            alert("CRM GUID created: " + NewCRMRecordCreated.new_trigger_wsId); 
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            alert("failure"); 
        } 
    }); 
}