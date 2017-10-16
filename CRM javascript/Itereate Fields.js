result = "";
Xrm.Page.data.entity.attributes.forEach(function (attribute, index) {
  var att = attribute.getName();
  if (Xrm.Page.getAttribute(att).getIsDirty()) {
      result += att + " esta dirty \n";
   }
}                                       
);
if(result){
	alert(result);
}