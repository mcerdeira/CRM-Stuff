function getAttributeValue(fieldName, sep) {
	var attribute = Xrm.Page.getAttribute(fieldName);
	var fieldValue = "";
	var type = attribute.getAttributeType();
	var value = attribute.getValue();

	switch (type) {
	case "decimal":
	case "double":
	case "integer":
	case "money":
		fieldValue = value;
		break;
	case "boolean":
		var thisElement = document.getElementById(fieldName);
			fieldValue = (value == thisElement.firstChild.value) ? thisElement.firstChild.text : thisElement.lastChild.text;
		break;
	case "optionset":
		fieldValue = attribute.getText();
		break;
	case "memo":
	case "string":
		if (value != null) {
			fieldValue = value;
		}
		break;
	case "datetime":
		if (value != null) {
			fieldValue = value.format("dd/mm/yy");
		}
		break;
	case "lookup":
		if (value != null) {
			lookupLength = value.length;
			for (var i = 0; i < lookupLength; i++) {
				fieldValue += value[i].name;

				if (i + 1 != lookupLength) {
					fieldValue += sep;
				}
			}
		}
		break;
	}
	return fieldValue;
}

// Create Dynamic Button for CRM 5
function removeChildNodes(ctrl) {
	while (ctrl.childNodes[0]) {
		ctrl.removeChild(ctrl.childNodes[0]);
	}
}

function CreateButtonCRM5(fieldName, buttonText, buttonWidth, iconName, clickEvent) {
	functiontocall = clickEvent;
	crmForm.all.item(fieldName + "_c").style.display = "none";

	var li = document.createElement("LI");
	li.setAttribute('id', fieldName + 'LI');
	li.setAttribute('className', 'ms-crm-Menu');
	li.setAttribute('title', buttonText);
	li.setAttribute('onclick', functiontocall);
	li.setAttribute('onmousedown', push_custom_button);
	li.setAttribute('onmouseup', release_custom_button);
	li.style.width = buttonWidth;
	li.style.cursor = "hand";
	li.style.textAlign = "center";
	li.style.overflow = "hidden";

	var span = document.createElement("span");
	span.setAttribute('className', 'ms-crm-Menu-Label');
	span.setAttribute('id', fieldName + 'Span');
	//span.style.cursor = "hand";
	li.style.listStyleImage = "url('/_imgs/ico/" + iconName + "')";

	li.appendChild(span);
	li.onmouseover = function () {
		li.setAttribute('className', 'ms-crm-Menu-Label-Hovered');
	};
	li.onmouseout = function () {
		li.setAttribute('className', 'ms-crm-Menu-Label');
	};

	var a = document.createElement("a");
	a.setAttribute('id', fieldName + 'A');
	a.setAttribute('className', 'ms-crm-Menu-Label');
	a.onclick = function () {
		return false;
	};
	a.setAttribute('target', '_self');
	a.setAttribute('href', 'javascript:onclick();');
	a.style.cursor = "hand";
	span.appendChild(a);

	var img = document.createElement("img");
	img.setAttribute('id', fieldName + 'Img');
	img.setAttribute('className', 'ms-crm-Menu-ButtonFirst');
	img.setAttribute('src', '/_imgs/ico/' + iconName);
	img.style.cursor = "hand";

	var span2 = document.createElement("span");
	span2.setAttribute('id', fieldName + 'Span2');
	span2.setAttribute('className', 'ms-crm-MenuItem-TextRTL');
	span2.innerText = buttonText;
	span2.style.cursor = "hand";
	//a.appendChild(img);
	a.appendChild(span2);

	removeChildNodes(crmForm.all.item(fieldName + "_d"));
	crmForm.all.item(fieldName + "_d").appendChild(li);
}

function push_custom_button() {
	window.event.srcElement.style.marginLeft = "1px";
	window.event.srcElement.style.marginTop = "1px";
}

function release_custom_button() {
	window.event.srcElement.style.marginLeft = "0px";
	window.event.srcElement.style.marginTop = "0px";
}

//iframeObjId - iframe control schema name
//objectType  - container entity code
//areaName    - related entity area name
//formId      - entity form id (optional)
function SetIframeContent(iframeObjId, objectType, primaryObjectId, areaName, iframeTitle, formId) {
	//Get iframe control
	var iframeObject = Xrm.Page.getControl(iframeObjId);
	if (iframeObject != null) {
		//assemble URL
		var strURL = "areas.aspx?formid=" + formId + "&navItemName=" + iframeTitle + "&oId=" + primaryObjectId + "&oType=" + objectType + "&pagemode=iframe&security=852023&tabSet=" + areaName;
		//Set iframe URL
		iframeObject.setSrc(strURL);
	}
}

function RefreshRibbon() {
	//Xrm.Page.ui.navigation.items.get()[0].setFocus();
	//Xrm.Page.ui.tabs.get()[0].setFocus();
	loadArea('areaProcessSessions');
	loadArea('areaForm');
	crmForm.GetTab($get('tab0', crmForm), true);
}

function setWindowSize() {
	var currentWidth = 630,
	currentHeight = 460,
	minimunHeight = 550,
	minimunWidth = 1220,
	x = 2,
	y = 0;

	if (document.body && document.body.offsetWidth) {
		currentWidth = window.top.document.body.offsetWidth;
		currentHeight = window.top.document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat' &&
		window.top.document.documentElement &&
		window.top.document.documentElement.offsetWidth) {
		currentWidth = window.top.document.documentElement.offsetWidth;
		currentHeight = window.top.document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		currentWidth = window.top.innerWidth;
		currentHeight = window.top.innerHeight;
	}

	//Correct values;
	currentHeight = currentHeight + 170;

	var screenWidth = screen.availWidth;

	if (currentWidth < minimunWidth) {
		x = (screenWidth - minimunWidth) / 2;
		window.top.moveTo(x, y);
		window.top.resizeTo(minimunWidth, currentHeight);
		currentWidth = minimunWidth;
	}

	if (currentHeight < minimunHeight) {
		x = (screenWidth - currentWidth) / 2;
		window.top.moveTo(x, y);
		window.top.resizeTo(currentWidth, minimunHeight);
	}
}

function clickRibbon() {
	window.top.document.getElementById("minimizeribbon").fireEvent("onclick");
}

/* function fixedLength
Uso en onchange:
Llamar función fixedLength,
marcar la opción "Pasar parametros de ejecución".
pasar los parametros crmField y stringLength (por ejemplo: "new_name",15)

Uso en onSave:
Llamar función fixedLength,
marcar la opción "Pasar parametros de ejecución".
pasar los parametros crmField, stringLength y isSave (por ejemplo: "new_name",15,true)
 */
function fixedLength(ExecutionObj, crmField, stringLength, isSave, allowEmpty) {
	if (allowEmpty === undefined) {
		allowEmpty = false;
	}

	var value = Xrm.Page.getAttribute(crmField).getValue();

	if (!value && allowEmpty) { // Vacio y permite vacios
		return;
	}
	if (!value || value.length != stringLength) {
		var label = Xrm.Page.getControl(crmField).getLabel();
		alert("El campo " + label + " debe tener exactamente " + stringLength + " caracteres.");
		if (isSave) {
			ExecutionObj.getEventArgs().preventDefault();
		}
	}
}

function ValidateToDate(ExCont, FldNameDTFrom, FldNameDTTo) {
	var DateFrom = Xrm.Page.getAttribute(FldNameDTFrom).getValue();
	var DateTo = Xrm.Page.getAttribute(FldNameDTTo).getValue();
	var LblDateFrom = Xrm.Page.getControl(FldNameDTFrom).getLabel();
	var LblDateTo = Xrm.Page.getControl(FldNameDTTo).getLabel();

	if (DateTo != null) {
		if (DateFrom != null) {
			if (DateTo.valueOf() < DateFrom.valueOf()) {
				if (ExCont.getEventArgs() != null)
					ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.

				alert('El campo ' + LblDateTo + ' debe ser posterior o igual al campo ' + LblDateFrom + '.');
			}
		} else {
			if (ExCont.getEventArgs() != null)
				ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.

			alert('Se debe especificar el campo ' + LblDateFrom + '.');
		}
	}
}

function ValidateFromDate(ExCont, FldNameDTFrom) {
	var Now = new Date();
	var DateFrom = Xrm.Page.getAttribute(FldNameDTFrom).getValue();
	var CreatedOn;
	var CreatedOnTmp;
	var LblDateFrom = Xrm.Page.getControl(FldNameDTFrom).getLabel();

	if (Xrm.Page.getAttribute('createdon').getValue() != null) {
		CreatedOnTmp = Xrm.Page.getAttribute('createdon').getValue();
		CreatedOn = new Date(CreatedOnTmp.getFullYear(), CreatedOnTmp.getMonth(), CreatedOnTmp.getDate());
	} else
		CreatedOn = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate());

	if (DateFrom != null) {
		if (DateFrom.valueOf() < CreatedOn.valueOf()) {
			if (ExCont.getEventArgs() != null)
				ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.

			alert('El campo ' + LblDateFrom + ' no puede ser inferior a la fecha de creación.');
		}
	}
}

function ValidateFinishDate(ExCont, FldNameDTFrom, FldNameDTFinish) {
	var FinishDate = Xrm.Page.getAttribute(FldNameDTFinish).getValue();
	var DateFrom = Xrm.Page.getAttribute(FldNameDTFrom).getValue();
	var LblDateFinish = Xrm.Page.getControl(FldNameDTFinish).getLabel();
	var LblDateFrom = Xrm.Page.getControl(FldNameDTFrom).getLabel();

	if (FinishDate != null) {
		if (DateFrom != null) {
			if (FinishDate.valueOf() < DateFrom.valueOf()) {
				ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.
				alert('El campo ' + LblDateFinish + ' no puede ser anterior al campo ' + LblDateFrom + '.');
			}
		} else {
			ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.
			alert('Si se especifica el campo ' + LblDateFinish + ' es necesario especificar el campo ' + LblDateFrom + '.');
		}
	}
}

function SetFinishDate(FldNameDTTo, FldNameDTFinish) {
	var DateTo = Xrm.Page.getAttribute(FldNameDTTo).getValue();
	var FinishDate = Xrm.Page.getAttribute(FldNameDTFinish);

	if (FinishDate.getValue() == null && DateTo != null)
		FinishDate.setValue(DateTo);
}

function padLength(ExecutionObj, crmField, stringLength, stringFill, mode) {
	var value = Xrm.Page.getAttribute(crmField).getValue();
	if (!value || value.length != stringLength) {
		while (value.length < stringLength) {
			if (mode == -1) {
				value = stringFill + value;
			} else {
				value = value + stringFill;
			}
		}
		Xrm.Page.getAttribute(crmField).setValue(value);
	}
}

function startAndEndDates(startDate, startCanBeNull, endDate, endCanBeNull, minimunDaysOfDifference) {
	//Variables locales para no sobreescribir los parametros
	var start = startDate;
	var end = endDate;

	//Inicializar el resultado
	result = {
		status : "error",
		message : "No se procesó la validación"
	};

	//Validar fecha inicial nula
	if (start == null) {
		if (!startCanBeNull) {
			result.message = "La fecha inicial no puede estar vacía";
		} else {
			result.status = "ok";
			result.message = "Fecha inicial vacía";
		}
		return result;
	}

	//Validar fecha final nula
	if (end == null) {
		if (!endCanBeNull) {
			result.message = "La fecha final no puede estar vacía";
		} else {
			result.status = "ok";
			result.message = "Fecha final vacía";
		}
		return result;
	}

	// Preparar fechas para comparar
	start.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);
	start.setDate(start.getDate() + minimunDaysOfDifference);

	// Comparar fechas
	if (start >= end) {
		if (minimunDaysOfDifference == 0)
			result.message = "La fecha final debe ser mayor a la fecha de inicio";
		else
			result.message = "La fecha final debe ser al menos " + minimunDaysOfDifference + " días mayor a la fecha de inicio";
	} else {
		result.status = "ok";
		result.message = "Validación correcta";
	}

	return result;
}

function lookup2guid(lookupItem) {
	/*
	Devuelve el guid de un campo lookup
	 */
	//lookupItem;
  var retVal;
	if (lookupItem != null && lookupItem[0] != null) {
		retVal = lookupItem[0].id;
	} else {
		retVal = "";
	}
	return retVal;
}

function lookup2text(lookupItem) {
	/*
	Devuelve el texto visible de un campo lookup
	 */
	var temparray = new Array();
  var retVal;
	temparray = lookupItem;
	if (temparray != null) {
		retVal = temparray[0].name;
	} else {
		retVal = "";
	}
	return retVal;
}

function isNumber(n) {
	/*
	Devuelve True, si todos los caracteres de una cadena son numeros
	 */
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isLetters(str) {
	/*
	Devuelve True, si todos los caracteres de una cadena son letras
	 */
	for (i = 0; i < str.length; i++) {
		if (isNumber(str[i])) {
			return false;
		}
	}
	return true;
}

function ODataSelect(entity, fields, filter, order, useasync, multi) {
	/// Funcion generica para hacer selects con OData
	/// <entity>: Nombre de entidad, sin "Set"
	/// <fields>: campos, separados por coma
	/// <filter>: filtro con sintaxis de OData
	/// <order>: (opcional) Orden del query
	/// <useasync>: (opcional) Usa llamadas asincronicas
	/// <multi>: (opcional) Devuelve multiples registros (por defecto desactivado)

	var retVal;
	var organizationName = Xrm.Page.context.getOrgUniqueName();
	var serverURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + organizationName;
	var odataSelect = serverURL + "/xrmservices/2011/OrganizationData.svc/" + entity + "Set?";
	odataSelect += "$select=" + fields + "&";
	if (order != undefined) {
		odataSelect += "$orderby=" + order + "&";
	}

	if (filter != undefined) {
		odataSelect += "$filter=" + filter;
	}

	if (useasync === undefined) {
		useasync = false;
	}

	if (multi === undefined) {
		multiples = false;
	} else {
		multiples = multi;
	}

	$.ajax({
		type : "GET",
		contentType : "application/json; charset=utf-8",
		datatype : "json",
		url : odataSelect,
		async : useasync,
		beforeSend : function (XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("Accept", "application/json");
		},
		success : function (data, textStatus, XmlHttpRequest) {
			if (data.d.results.length == 0) {
				return;
			}
			if (multiples) {
				retVal = data.d.results;
			} else {
				retVal = data.d.results[0];
			}
			return;
		},
		error : function (XmlHttpRequest, textStatus, errorThrown) {
			alert('OData Select Failed: ' + odataSelect);
		}
	});
	return retVal;
}

function ODataSelectAjax(entity, fields, filter, order, useasync) {
	/*
	Funcion generica para hacer selects con OData
	<entity>: Nombre de entidad, sin "Set"
	<fields>: campos, separados por coma
	<filter>: filtro con sintaxis de OData
	<order>: (opcional) Orden del query
	<useasync>: (opcional) Usa llamadas asincronicas
	Devuelve un Ajax
	 */

	if (useasync === undefined) {
		useasync = false;
	}

	var retVal;
	var organizationName = Xrm.Page.context.getOrgUniqueName();
	var serverURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + organizationName;
	var odataSelect = serverURL + "/xrmservices/2011/OrganizationData.svc/" + entity + "Set?";
	odataSelect += "$select=" + fields + "&";
	if (order != undefined) {
		odataSelect += "$orderby=" + order + "&";
	}
	odataSelect += "$filter=" + filter;

	return $.ajax({
		type : "GET",
		contentType : "application/json; charset=utf-8",
		datatype : "json",
		url : odataSelect,
		async : useasync,
		beforeSend : function (XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("Accept", "application/json");
		},
		success : function (data, textStatus, XmlHttpRequest) {
			if (data.d.results.length == 0) {
				return;
			}
			retVal = data.d.results[0];
			return;
		},
		error : function (XmlHttpRequest, textStatus, errorThrown) {
			alert('OData Select Failed: ' + odataSelect);
		}
	});
}

function Left(str, n) {
	/*Port de funcion de VBS*/
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else
		return String(str).substring(0, n);
}

function Right(str, n) {
	/*Port de funcion de VBS*/
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

function stripAlphaChars(pstrSource) {
	var m_strOut;
  if (pstrSource) {
		m_strOut = new String(pstrSource);
		m_strOut = m_strOut.replace(/[^0-9]/g, '');
	} else {
		m_strOut = pstrSource;
	}
	return m_sOut;
}

function doesControlHaveAttribute(control) {
	var controlType = control.getControlType();
	return controlType != "iframe" && controlType != "webresource" && controlType != "subgrid";
}

function disableFormFields(onOff) {
	Xrm.Page.ui.controls.forEach(function (control, index) {
		if (doesControlHaveAttribute(control)) {
			control.setDisabled(onOff);
		}
	});
}

function StrKeep(Str, Keep) {
	var Idx;
	var Ret = '';

	if (Str != null) {
		for (Idx = 0; Idx < Str.toString().length; Idx++) {
			if (Keep.toString().indexOf(Str.toString().substr(Idx, 1)) != -1)
				Ret += Str.toString().substr(Idx, 1);
		}
	}

	return Ret;
}

function showGuid(fieldName) {
	var formType = Xrm.Page.ui.getFormType();

	if (formType == 2 || formType == 3 || formType == 4) {
		var guid = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
		Xrm.Page.getAttribute(fieldName).setValue((guid.replace("{", "")).replace("{", ""));
		Xrm.Page.getAttribute(fieldName).setSubmitMode("never");
	}
}