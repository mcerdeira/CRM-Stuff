function setReadOnly() {	
	var formType = Xrm.Page.ui.getFormType()	
	if (formType != 1) { // No es creacion
		var statuscode = Xrm.Page.getAttribute("statuscode").getValue();
		if(statuscode == 100000001 && !Xrm.Page.getAttribute('statuscode').getIsDirty()){ // Aprobado y no está con un cambio sin guardar
			disableFormFields(true);
		}else{
			if(statuscode == 100000001 && Xrm.Page.getAttribute('statuscode').getIsDirty()){ // Intentaron aprobar, pero el plugin lo rebotó
				// Volver a poner el valor anterior
				Xrm.Page.getAttribute("statuscode").setValue(getStatusOriginal(Xrm.Page.data.entity.getId()));
			}
		}
	}
}

function getStatusOriginal(currGuid){
	// Buscar estado original de movimiento	
	var sFetch = ["<fetch mapping='logical' distinct='false'>" +
		"<entity name='new_movimientopresupuestario'>" +
		"<attribute name='statuscode' />" +
		"<filter type='and'>" +
		"<condition attribute = 'new_movimientopresupuestarioid' operator='eq' value='" + currGuid + "'/>" +
		"</filter>" +
		"</entity>" +
		"</fetch>"].join('');
	var fetched = CrmServiceToolkit.Fetch(sFetch);	
	if(fetched[0]){
		var statuscode = fetched[0].getValue('statuscode');	
		if(statuscode){
			return statuscode;
		}else{
			return null;
		}
	}
}