function callDialogs(){   
  var dialogId = "5E488FAC-4277-41A0-BF18-949AEC42B131";
  var alto = 600;
  var ancho = 800;   
  openProcessDialog(dialogId, alto, ancho);  
}

function openProcessDialog(dialogId, alto, ancho){
  if(dialogId && dialogId.length == 36){
    alto  = (alto)  ? alto  : 600;
    ancho = (ancho) ? ancho : 800;
    
    var organizationName = Xrm.Page.context.getOrgUniqueName();
    var entityName       = Xrm.Page.data.entity.getEntityName();
    var entityId         = Xrm.Page.data.entity.getId();
    
    var entityId  = (entityId.replace("{","")).replace("}","");
    
    var crmUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + organizationName ;
    var resultURL = crmUrl+"/cs/dialog/rundialog.aspx?DialogId=%7b"+dialogId+"%7d&EntityName="+entityName+"&ObjectId=%7b"+entityId+"%7d";
    
    window.showModalDialog(resultURL, null, "dialogHeight:" + alto + 
                                            "px;dialogWidth:" + ancho + 
                                            "px;center:yes; resizable:1;maximize:1;minimize:1;status:no;scroll:no" );
  }
  else
  {
    alert("Funcion openProcessDialog: \n\nDebe indicar un dialogId válido");
  }
}