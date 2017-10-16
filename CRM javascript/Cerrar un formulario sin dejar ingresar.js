function validaExistaPep() {
	
	var pep = Xrm.Page.getAttribute("new_pepid").getValue();
	
	if (pep == null || pep == '') {
		var attributes = Xrm.Page.data.entity.attributes.get();
		
		for (var i in attributes) {
			attributes[i].setSubmitMode("never");
		}
		
		alert("El POA debe ser creado desde su correspondiente PEP. La ventana se cerrará automáticamente al hacer clic en aceptar");
		Xrm.Page.ui.close();
	}
}
