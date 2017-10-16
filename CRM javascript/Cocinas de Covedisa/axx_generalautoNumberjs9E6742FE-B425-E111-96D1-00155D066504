function autoName(destination){
  var argLength = arguments.length;
  var name="", sep="", attValue="";
  
  for (i = 1; i < argLength; i+=2){
    sep = (i + 1 < argLength) ? arguments[i+1] : "";
    attValue = getAttributeValue(arguments[i], sep);
    name += (attValue != "") ? attValue + sep : "";
  }
  
  Xrm.Page.getAttribute(destination).setValue(name);
  Xrm.Page.getAttribute(destination).setSubmitMode("always");
}

function getAttributeValue(fieldName, sep){
  var attribute = Xrm.Page.getAttribute(fieldName);
  var fieldValue;
  var type = attribute.getAttributeType();
  var value = attribute.getValue();
  
  switch (type)
  {
    case "decimal":
    case "double":
    case "integer":
    case "money":
      fieldValue = value;
      break;
    case "boolean":
      var thisElement = document.getElementById(fieldName)
      fieldValue = (value == thisElement.firstChild.value) ? thisElement.firstChild.text : thisElement.lastChild.text;
      break;
    case "optionset":
      fieldValue = attribute.getText();
      break;
    case "memo":
    case "string":
      if (value != null){
        fieldValue = value;
      }
      break;
    case "datetime":
      if (value != null){
        fieldValue = value.format("dd/mm/yy");
      }
      break;
    case "lookup":
      if (value != null)
      {
        lookupLength = value.length;
        for (var i = 0; i < lookupLength; i++){
          fieldValue += value[i].name;
          
          if (i + 1 != lookupLength){ 
            fieldValue += sep;
          }
        }
      }
      break;
  }
  return fieldValue;
}