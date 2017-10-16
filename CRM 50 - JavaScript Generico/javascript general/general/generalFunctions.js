/*global Axx: true*/
//If the Axx and Axx.SalesOrder namespaces objects are not defined, create them.
if (typeof Axx == "undefined") {
	Axx = {};
}
if (typeof Axx.General == "undefined") {
	Axx.General = {				
		/// Axx.General.lookupObject(fieldOrig, entityType);
		lookupObject: function (fieldOrig, entityType){
			if(Xrm.Page.getAttribute(fieldOrig).getValue()){
				var objLookUp = new Array();	
				var id = Xrm.Page.getAttribute(fieldOrig).getValue()[0].id;
				var name = Xrm.Page.getAttribute(fieldOrig).getValue()[0].name;	
				objLookUp[0] = new Object();
				objLookUp[0].id = id;
				objLookUp[0].name = name;
				objLookUp[0].entityType = entityType;	
				return objLookUp;
			}else{
				return null;
			}
		},		
		/// Axx.General.showAlert(message);
		showAlert: function(message){
			var notificationsArea = document.getElementById('crmNotifications');
			if (notificationsArea == null) {
				alert(message);
			}else{
			   notificationsArea.AddNotification("1230000321", 2, "ribbonButton", message); 
			}
		},		
		/// Axx.General.hideAlert();
		hideAlert : function(){
			var notificationsArea = document.getElementById('crmNotifications');
			if (notificationsArea != null) {
				notificationsArea.SetNotifications("1230000321", "ribbonButton");
			}    
		},		
		/// Axx.General.getTextValue(fieldName, sep);
		getAttributeValue : function (fieldName, sep) {
			/* Devuelve el valor con formato de texto para cualquier tipo de campo.
			 */
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
					var i;
					for (i = 0; i < lookupLength; i++) {
						fieldValue += value[i].name;
						if (i + 1 != lookupLength) {
							fieldValue += sep;
						}
					}
				}
				break;
			}
			return fieldValue;
		},
		/// Axx.General.setIframeContent(iframeObjId, objectType, primaryObjectId, areaName, iframeTitle, formId);
		setIframeContent : function (iframeObjId, objectType, primaryObjectId, areaName, iframeTitle, formId) {
			/* Gets the iframe control
			iframeObjId - iframe control schema name
			objectType  - container entity code
			areaName    - related entity area name
			formId      - entity form id (optional)
			 */
			var iframeObject = Xrm.Page.getControl(iframeObjId);
			if (iframeObject != null) {
				//assemble URL
				var strURL = "areas.aspx?formid=" + formId + "&navItemName=" + iframeTitle + "&oId=" + primaryObjectId + "&oType=" + objectType + "&pagemode=iframe&security=852023&tabSet=" + areaName;
				//Set iframe URL
				iframeObject.setSrc(strURL);
			}
		},
		/// Axx.General.refreshRibbon();
		refreshRibbon : function () {
			//Xrm.Page.ui.navigation.items.get()[0].setFocus();
			//Xrm.Page.ui.tabs.get()[0].setFocus();
			loadArea('areaProcessSessions');
			loadArea('areaForm');
			crmForm.GetTab($get('tab0', crmForm), true);
		},
		/// Axx.General.setWindowSize();
		setWindowSize : function () {
			var currentWidth = 630, currentHeight = 460, minimunHeight = 550, minimunWidth = 1220, x = 2, y = 0;
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
		},
		/// Axx.General.fixedLength(ExecutionObj, crmField, stringLength, isSave, allowEmpty);
		fixedLength : function (ExecutionObj, crmField, stringLength, isSave, allowEmpty) {
			/* Uso en onchange:
			Llamar función fixedLength,
			marcar la opción "Pasar parametros de ejecución".
			pasar los parametros crmField y stringLength (por ejemplo: "new_name",15)
			Uso en onSave:
			Llamar función fixedLength,
			marcar la opción "Pasar parametros de ejecución".
			pasar los parametros crmField, stringLength y isSave (por ejemplo: "new_name",15,true)
			 */
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
		},
		/// Axx.General.validateToDate(ExCont, FldNameDTFrom, FldNameDTTo);
		validateToDate : function (ExCont, FldNameDTFrom, FldNameDTTo) {
			var DateFrom = Xrm.Page.getAttribute(FldNameDTFrom).getValue();
			var DateTo = Xrm.Page.getAttribute(FldNameDTTo).getValue();
			var LblDateFrom = Xrm.Page.getControl(FldNameDTFrom).getLabel();
			var LblDateTo = Xrm.Page.getControl(FldNameDTTo).getLabel();
			if (DateTo != null) {
				if (DateFrom != null) {
					if (DateTo.valueOf() < DateFrom.valueOf()) {
						if (ExCont.getEventArgs() != null) {
							ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.
						}
						alert('El campo ' + LblDateTo + ' debe ser posterior o igual al campo ' + LblDateFrom + '.');
					}
				} else {
					if (ExCont.getEventArgs() != null) {
						ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.
					}
					alert('Se debe especificar el campo ' + LblDateFrom + '.');
				}
			}
		},
		/// Axx.General.validateFromDate(ExCont, FldNameDTFrom);
		validateFromDate : function (ExCont, FldNameDTFrom) {
			var Now = new Date();
			var DateFrom = Xrm.Page.getAttribute(FldNameDTFrom).getValue();
			var CreatedOn;
			var CreatedOnTmp;
			var LblDateFrom = Xrm.Page.getControl(FldNameDTFrom).getLabel();
			if (Xrm.Page.getAttribute('createdon').getValue() != null) {
				CreatedOnTmp = Xrm.Page.getAttribute('createdon').getValue();
				CreatedOn = new Date(CreatedOnTmp.getFullYear(), CreatedOnTmp.getMonth(), CreatedOnTmp.getDate());
			} else {
				CreatedOn = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate());
			}
			if (DateFrom != null) {
				if (DateFrom.valueOf() < CreatedOn.valueOf()) {
					if (ExCont.getEventArgs() != null) {
						ExCont.getEventArgs().preventDefault(); //Cancelo el guardado.
					}
					alert('El campo ' + LblDateFrom + ' no puede ser inferior a la fecha de creación.');
				}
			}
		},
		/// Axx.General.validateFinishDate(ExCont, FldNameDTFrom, FldNameDTFinish);
		validateFinishDate : function (ExCont, FldNameDTFrom, FldNameDTFinish) {
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
		},
		/// Axx.General.setFinishDate(FldNameDTTo, FldNameDTFinish);
		setFinishDate : function (FldNameDTTo, FldNameDTFinish) {
			var DateTo = Xrm.Page.getAttribute(FldNameDTTo).getValue();
			var FinishDate = Xrm.Page.getAttribute(FldNameDTFinish);
			if (FinishDate.getValue() == null && DateTo != null) {
				FinishDate.setValue(DateTo);
			}
		},
		/// Axx.General.padLength(ExecutionObj, crmField, stringLength, stringFill, mode);
		padLength : function (ExecutionObj, crmField, stringLength, stringFill, mode) {
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
		},
		/// Axx.General.startAndEndDates(startDate, startCanBeNull, endDate, endCanBeNull, minimunDaysOfDifference);
		startAndEndDates : function (startDate, startCanBeNull, endDate, endCanBeNull, minimunDaysOfDifference) {
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
				if (minimunDaysOfDifference == 0) {
					result.message = "La fecha final debe ser mayor a la fecha de inicio";
				} else {
					result.message = "La fecha final debe ser al menos " + minimunDaysOfDifference + " días mayor a la fecha de inicio";
				}
			} else {
				result.status = "ok";
				result.message = "Validación correcta";
			}
			return result;
		},
		/// Axx.General.lookup2guid(lookupItem);
		lookup2guid : function (lookupItem) {
			/* Devuelve el guid de un campo lookup */
			var retVal;
			if (lookupItem != null && lookupItem[0] != null) {
				retVal = lookupItem[0].id;
			} else {
				retVal = "";
			}
			return retVal;
		},
		/// Axx.General.lookup2text(lookupItem);
		lookup2text : function (lookupItem) {
			/*   Devuelve el texto visible de un campo lookup */
			var retVal;
			if (lookupItem != null) {
				retVal = lookupItem[0].name;
			} else {
				retVal = "";
			}
			return retVal;
		},
		/// Axx.General.isNumber(n);
		isNumber : function (n) {
			/*
			Devuelve True, si todos los caracteres de una cadena son numeros
			 */
			return !isNaN(parseFloat(n)) && isFinite(n);
		},
		/// Axx.General.isLetters(str);
		isLetters : function (str) {
			/*
			Devuelve True, si todos los caracteres de una cadena son letras
			 */
			for (i = 0; i < str.length; i++) {
				if (isNumber(str[i])) {
					return false;
				}
			}
			return true;
		},
		/// Axx.General.ODataSelect(entity, fields, filter, order);
		ODataSelect : function (entity, fields, filter, order) {
			/*
			Funcion generica para hacer selects con OData
			<entity>: Nombre de entidad, sin "Set"
			<fields>: campos, separados por coma
			<filter>: filtro con sintaxis de OData
			<order>: (opcional) Orden del query
			 */
			var retVal;
			var serverURL = Xrm.Page.context.getServerUrl();
			var odataSelect = serverURL + "/xrmservices/2011/OrganizationData.svc/" + entity + "Set?";
			odataSelect += "$select=" + fields + "&";
			if (order !== undefined) {
				odataSelect += "$orderby=" + order + "&";
			}
			odataSelect += "$filter=" + filter;
			$.ajax({
				type : "GET",
				contentType : "application/json; charset=utf-8",
				datatype : "json",
				url : odataSelect,
				async : false,
				beforeSend : function (XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("Accept", "application/json");
				},
				success : function (data, textStatus, XmlHttpRequest) {
					if (data.d.results.length === 0) {
						return;
					}
					retVal = data.d.results;
					return;
				},
				error : function (XmlHttpRequest, textStatus, errorThrown) {
					alert('OData Select Failed: ' + odataSelect);
				}
			});
			return retVal;
		},
		/// Axx.General.ODataSelectAjax(entity, fields, filter, order);
		ODataSelectAjax : function (entity, fields, filter, order, onSuccess, onError) {
			/*
			Funcion generica para hacer selects con OData
			<entity>: Nombre de entidad, sin "Set"
			<fields>: Campos, separados por coma
			<filter>: Filtro con sintaxis de OData
			<order>: (opcional) Orden del query
			<onSuccess>: (opcional) Funcion a llamar si la ejecución termina ok.
			<onError>: (opcional) Funcion a llamar si hay un error en la ejecución.
			Devuelve un Ajax
			 */
			var serverURL = Xrm.Page.context.getServerUrl();
			var odataSelect = serverURL + "/xrmservices/2011/OrganizationData.svc/" + entity + "Set?";
			odataSelect += "$select=" + fields + "&";
			if (order !== undefined) {
				odataSelect += "$orderby=" + order + "&";
			}
			odataSelect += "$filter=" + filter;
			if (!onSuccess || typeof onSuccess !== 'function') {
				onSuccess = function (data, textStatus, XmlHttpRequest) {
					return;
				};
			}
			if (!onError || typeof onError !== 'function') {
				onError = function (XmlHttpRequest, textStatus, errorThrown) {
					alert('OData Select Failed: ' + odataSelect);
				};
			}
			return $.ajax({
				type : "GET",
				contentType : "application/json; charset=utf-8",
				datatype : "json",
				url : odataSelect,
				async : true,
				beforeSend : function (XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("Accept", "application/json");
				},
				success : onSuccess,
				error : onError
			});
		},
		/// Axx.General.Left(str, n);
		Left : function (str, n) {
			/*Port de funcion de VBS*/
			if (n <= 0) {
				return "";
			} else if (n > String(str).length) {
				return str;
			} else {
				return String(str).substring(0, n);
			}
		},
		/// Axx.General.Right(str, n);
		Right : function (str, n) {
			/*Port de funcion de VBS*/
			if (n <= 0) {
				return "";
			} else if (n > String(str).length) {
				return str;
			} else {
				var iLen = String(str).length;
				return String(str).substring(iLen, iLen - n);
			}
		},
		/// Axx.General.stripAlphaChars(pstrSource);
		stripAlphaChars : function (pstrSource) {
			var m_strOut;
			if (pstrSource) {
				m_strOut = String(pstrSource);
				m_strOut = m_strOut.replace(/[^0-9]/g, '');
			} else {
				m_strOut = pstrSource;
			}
			return m_sOut;
		},
		/// Axx.General.doesControlHaveAttribute(control);
		doesControlHaveAttribute : function (control) {
			var controlType = control.getControlType();
			return controlType != "iframe" && controlType != "webresource" && controlType != "subgrid";
		},
		/// Axx.General.disableFormFields(onOff);
		disableFormFields : function (onOff) {
			Xrm.Page.ui.controls.forEach(function (control, index) {
				if (doesControlHaveAttribute(control)) {
					control.setDisabled(onOff);
				}
			});
		},
		/// Axx.General.StrKeep(Str, Keep);
		StrKeep : function (Str, Keep) {
			var Idx;
			var Ret = '';
			if (Str != null) {
				for (Idx = 0; Idx < Str.toString().length; Idx++) {
					if (Keep.toString().indexOf(Str.toString().substr(Idx, 1)) != -1) {
						Ret += Str.toString().substr(Idx, 1);
					}
				}
			}
			return Ret;
		},
		/// Axx.General.showGuid(fieldName);
		showGuid : function (fieldName) {
			var formType = Xrm.Page.ui.getFormType();
			if (formType == 2 || formType == 3 || formType == 4) {
				var guid = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");
				Xrm.Page.getAttribute(fieldName).setValue((guid.replace("{", "")).replace("{", ""));
				Xrm.Page.getAttribute(fieldName).setSubmitMode("never");
			}
		},
		/// Axx.General.openProcessDialog(dialogId, alto, ancho);
		openProcessDialog : function (dialogId, height, width) {
			/* Opens a dialog. Height and width are optionals.
			 */
			if (dialogId && dialogId.length == 36) {
				var entityId, dialogURL, args, ornamentList;
				height = (height) || 600;
				width  = (width)  || 800;
				entityId = Xrm.Page.data.entity.getId();
				entityId = (entityId.replace("{", "")).replace("}", "");
				dialogURL = Xrm.Page.context.getServerUrl() + "/cs/dialog/rundialog.aspx";
				dialogURL += "?DialogId=%7b" + dialogId + "%7d";
				dialogURL += "&EntityName=" + Xrm.Page.data.entity.getEntityName();
				dialogURL += "&ObjectId=%7b" + entityId + "%7d";
				args = null;
				ornamentList = "dialogHeight:" + height + "px;dialogWidth:" + width;
				ornamentList += "px;center:yes; resizable:1;maximize:1;minimize:1;status:no;scroll:no";
				window.showModalDialog(dialogURL, args, ornamentList);
			} else {
				console.error("Funcion openProcessDialog: \n\nDebe indicar un dialogId válido");
			}
		},
		/// Axx.General.setFieldArraySubmitMode(fieldsToSubmit, submitMode);
		setFieldArraySubmitMode : function (fieldsToSubmit, submitMode) {
			/*  Sets the same submitMode to all the fields in named in an array of fields name.
			 */
			var arrayLength = fieldsToSubmit.length;
			for (i = 0; i < arrayLength; i++) {
				Xrm.Page.getAttribute(fieldsToSubmit[i]).setSubmitMode(submitMode);
			}
		}
	};
}
