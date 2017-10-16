function openNewEmail(){
	var activityTypeCode = 4202; // Email Activity
	var regardingObjectId = Xrm.Page.data.entity.getId(); // Guid de Campaña
	var regardingObjectType = 4400; // Campaign
	var regardingObjectName = Xrm.Page.getAttribute("name").getValue(); // Nombre de Campaña	
	var aprobador;
	if (Xrm.Page.getAttribute("new_aprobador").getValue()) {
		aprobador = Xrm.Page.getAttribute("new_aprobador").getValue()[0].id;
	}		
	var partyid = aprobador;
	var partyname = Xrm.Page.getAttribute("new_aprobador").getValue()[0].name;
	var partytype = 8;	
	CustomAction_OpenActivity(activityTypeCode, regardingObjectId, regardingObjectType, regardingObjectName, partyid, partyname, partytype);	
}

function CustomAction_OpenActivity(activityTypeCode, regardingObjectId, regardingObjectType, regardingObjectName, partyid, partyname, partytype){
	/// <summary>
	/// Open an activity form by an window popup
	/// </summary>
	/// <param name="activityTypeCode">Activity code to open the form</param>
	/// <param name="regardingObjectId">Guid value of the regarding field to set</param>
	/// <param name="regardingObjectType">Entity code of the regarding field to set</param>
	/// <param name="regardingObjectName">Value to show of the regarding field to set</param>
    var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes";
    //Encode Guid of regardingObject to set
    regardingObjectId = encodeURIComponent(regardingObjectId);
    var extraqs = "pId=" + regardingObjectId;
    extraqs += "&pType=" + regardingObjectType;
    extraqs += "&pName=" + regardingObjectName;    
    extraqs += "&partyid=" + partyid;
    extraqs += "&partyname=" + partyname;
    extraqs += "&partytype=" + partytype;
    //Encode extraqs query parameter
    extraqs =  encodeURIComponent(extraqs);
    window.open(Xrm.Page.context.getServerUrl() + "/main.aspx?etc=" + activityTypeCode + "&pagetype=entityrecord&extraqs=" + extraqs, "_blank", features, false);
}