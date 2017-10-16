// Mal
var organizationName = Xrm.Page.context.getOrgUniqueName(); 
var serverURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + organizationName; 

// Bien
var serverUrl = Xrm.Page.context.getServerUrl(); 