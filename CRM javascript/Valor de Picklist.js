var tipo_caso = Xrm.Page.getAttribute("casetypecode").getSelectedOption().value;
var tipo_caso_nombre = Xrm.Page.getAttribute("casetypecode").getSelectedOption().text;

// Desde un fetch

function test() {
	// Buscar estado original de movimiento
	var sFetch = ["<fetch mapping='logical' distinct='false'>" +
		"<entity name='new_poa'>" +
		"<attribute name='new_anio' />" +
		"<filter type='and'>" +
		"<condition attribute = 'statecode' operator='eq' value='0'/>" +
		"</filter>" +
		"</entity>" +
		"</fetch>"].join('');
	var fetched = CrmServiceToolkit.Fetch(sFetch);
	if (fetched[0]) {
		var statuscode = fetched[0].attributes.new_anio.name;
		
		if (statuscode) {
			alert(statuscode);
		} else {
			alert("nada");
		}
	}
}
