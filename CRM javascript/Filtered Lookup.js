// Para robarse el fetch, usar la busqueda avanzada
// Para robarse el el layout, usar función F12 de IE, marcar la grilla y buscar por el texto "layoutXml"



function setProductLookupFilter(ClearProductLookup, isOnLoad) {
  var Regarding = Xrm.Page.getAttribute("regardingobjectid");
  var RecordName;
  var RecordId;
  var ViewId = "{00000000-0000-0000-0000-000000000010}";
  var EntityName = "product";
  var ViewDisplayName;
  var FetchXml;
  var LayoutXml = "<grid name='resultset' object='1024' jump='name' select='1' icon='1' preview='1'>" +
                  "<row name='result' id='productid'>" +
                  "<cell name='name' width='250' />" +
                  "<cell name='productnumber' width='100' />" +
                  "<cell name='producttypecode' width='100' />" +
                  "</row>" +
                  "</grid>";

  if (Regarding.getValue() != null && Regarding.getValue()[0].type == 1088) { //Si está referenciando a un pedido.
    RecordId = Regarding.getValue()[0].id;
    RecordName = Regarding.getValue()[0].name;

    ViewDisplayName = "Productos del pedido: " + RecordName;

    FetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
               "<entity name='product'>" +
               "<attribute name='productid' />" +
               "<order attribute='name' descending='false' />" +
               "<link-entity name='salesorderdetail' from='productid' to='productid' alias='aa'>" +
               "<link-entity name='salesorder' from='salesorderid' to='salesorderid' alias='ab'>" +
               "<filter type='and'>" +
               "<condition attribute='salesorderid' operator='eq' value='" + RecordId + "' />" +
               "</filter>" +
               "</link-entity>" +
               "</link-entity>" +
               "</entity>" +
               "</fetch>";
  } else {
    if(typeof isOnLoad != "undefined" && isOnLoad) {return;}
    ViewDisplayName = "Productos";
    FetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
               "<entity name='product'>" +
               "<attribute name='productid' />" +
               "<order attribute='name' descending='false' />" +
               "</entity>" +
               "</fetch>";
  }

  if (ClearProductLookup) {
    Xrm.Page.getAttribute("axx_productid").setValue(null);
  }
  Xrm.Page.getControl("axx_productid").addCustomView(ViewId, EntityName, ViewDisplayName, FetchXml, LayoutXml, true);
}