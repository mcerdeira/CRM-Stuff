Xrm.Page.data.entity.attributes.forEach(function (attribute, index) {
  var att = attribute.getName();
  Xrm.Page.getControl(att).setVisible(false);
}                                       
);