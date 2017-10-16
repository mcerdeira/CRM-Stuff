function DevolverActionTrigger()
{
   if(Xrm.Page.ui.getFormType() == 1)
   {
       Xrm.Page.ui.setFormNotification("Debe grabar primero", "WARNING");
       return;
   }
    var reference = {"new_alquilerid": Xrm.Page.data.entity.getId()};
    var params = {"Alquiler" : reference};
    var result = callAction("new_Devolver", params);
    if(result.DevolucionOK)
    {
        Xrm.Page.data.refresh();
    }
}

function  callAction(actionName, params)
{
    var result = null;
    var serverURL = Xrm.Page.context.getClientUrl();
    var req = new XMLHttpRequest();
    req.open("POST", serverURL + "/api/data/v8.0/" + actionName, false);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function()
    {
        if (this.readyState  == 4) 
        {
            req.onreadystatechange = null;
            result = JSON.parse(req.response);
        }
    }
    req.send(JSON.stringify(params));
    return result;
}