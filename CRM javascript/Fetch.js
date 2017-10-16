function fetchOnChangeAlianza(campo) {
    if (Xrm.Page.getControl(campo).getDisabled()){
    	return; // Si esta deshabilitado, es el evento de cambio del campo copiado
	}
    // Get the ID of the Alianza
    if(Xrm.Page.getAttribute(campo).getValue()){
	    var sAlianzaGUID = Xrm.Page.getAttribute(campo).getValue()[0].id;
	    var sFetch = ["<fetch mapping='logical' count='10'>" +
	        "<entity name='new_alianza'>" +
	        "<attribute name='transactioncurrencyid' />" +
	        "<filter type='and'>" +
	        "<condition attribute = 'new_alianzaid' operator='eq' value='" + sAlianzaGUID + "'/>" +
	        "</filter>" +
	        "</entity>" +
	        "</fetch>"].join('');
	    var fetchedMonedas = CrmServiceToolkit.Fetch(sFetch);
	    var monedaid = fetchedMonedas[0].getValue('transactioncurrencyid');
	    if (monedaid == null) {
	        alert("La Alianza seleccionada no tiene registrada la moneda de control de presupuesto. Por favor, actualice esta información en la Alianza, o bien seleccione otra opción.");
	        Xrm.Page.getAttribute(campo).setValue(null)
	    } else {
	        // Get Moneda
	        var sFetch2 = ["<fetch mapping='logical' count='10'>" +
	            "<entity name='transactioncurrency'>" +
	            "<attribute name='currencyname' />" +
	            "<filter type='and'>" +
	            "<condition attribute = 'transactioncurrencyid' operator='eq' value='" + monedaid + "'/>" +
	            "</filter>" +
	            "</entity>" +
	            "</fetch>"].join('');
	        var fetchedMonedas = CrmServiceToolkit.Fetch(sFetch2);
	        var textValue = fetchedMonedas[0].getValue('currencyname');
	        var typeValue = "transactioncurrency";
	
	        var objetoMoneda = new Array();
	        objetoMoneda[0] = new Object();
	        objetoMoneda[0].id = monedaid;
	        objetoMoneda[0].name = textValue;
	        objetoMoneda[0].entityType = typeValue;
	
	        Xrm.Page.getAttribute("acb_monedaalianza").setValue(objetoMoneda);
	    }
	}else{ 
	    Xrm.Page.getAttribute("acb_monedaalianza").setValue(null);
	}
}