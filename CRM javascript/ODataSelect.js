function ODataSelect(entity, fields, filter, order){
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
  if (order != undefined) {
      odataSelect += "$orderby=" + order + "&";
  }  
  odataSelect += "$filter=" + filter;

  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    url: odataSelect,
    async: false,
    beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
    success: function (data, textStatus, XmlHttpRequest){
          if(data.d.results.length == 0){
            return
          }
          retVal = data.d.results;
          return;
        },
    error: function (XmlHttpRequest, textStatus, errorThrown) { alert('OData Select Failed: ' + odataSelect); }
  });
 return retVal;
}

function ODataSelectAjax(entity, fields, filter, order) {
/*
Funcion generica para hacer selects con OData
<entity>: Nombre de entidad, sin "Set"
<fields>: campos, separados por coma
<filter>: filtro con sintaxis de OData
<order>: (opcional) Orden del query	
Devuelve un Ajax
*/
	var retVal;	
	var serverURL = Xrm.Page.context.getServerUrl();
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
		async : true,
		beforeSend : function (XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("Accept", "application/json");
		},
		success : function (data, textStatus, XmlHttpRequest) {
			if (data.d.results.length == 0) {
				return;
			}
			retVal = data.d.results;
			return;
		},
		error : function (XmlHttpRequest, textStatus, errorThrown) {
			alert('OData Select Failed: ' + odataSelect);
		}
	});
}

/* 
  Ejemplo de uso de ODataSelectAjax
*/

function callAutocomplete() {
  var camp = Xrm.Page.context.getQueryStringParameters().Mit_Cmp;
  var cont = Xrm.Page.context.getQueryStringParameters().Mit_Ani;
  var TipCampania = Xrm.Page.context.getQueryStringParameters().Mit_Dir;
  var Accion = Xrm.Page.context.getQueryStringParameters().Mit_Acc;
  var tofrom;
  var formType = Xrm.Page.ui.getFormType(); // 1:Create 2:Update

  if (Accion && Accion.toLowerCase() == "open" && formType == 1) {
    if (TipCampania.toLowerCase() == "in") {
      Xrm.Page.getAttribute("directioncode").setValue(0);
      tofrom = "from";
    } else if (TipCampania.toLowerCase() == "out") {
      Xrm.Page.getAttribute("directioncode").setValue(1);
      tofrom = "to";
    } else {
      if (Xrm.Page.getAttribute("directioncode").getValue() == 1) { //Out
        tofrom = "to";
      } else {
        tofrom = "from";
      }
    }
    Xrm.Page.getAttribute("phonenumber").setValue(cont);
    var getCampana = function (c) {
      if (c) {
        var where;
        var order;
        where = "axx_Codigo_Interfaz_Telefonia eq '" + c + "'";
        order = "CreatedOn desc";
        return ODataSelectAjax("axx_campana", "axx_campanaId, axx_name, axx_grupoderesultadosdellamada", where, order);
      } else {
        return null;
      }
    };
    var getContact = function (c) {
      if (c) {
        var where;
        var order;
        where = "axx_ani eq '" + c + "'";
        order = "CreatedOn desc";
        return ODataSelectAjax("Contact", "ContactId, FullName", where, order);
      } else {
        return null;
      }
    };

    $.when(getCampana(camp), getContact(cont)
      ).then(function (campana, contact) {
      var lookup;
      if (campana[0] && campana[0].d) {
        if (campana[0].d.results[0] && campana[0].d.results[0].axx_campanaId) {
          lookup = newLookupValue(campana[0].d.results[0].axx_campanaId, "axx_campana", campana[0].d.results[0].axx_name);
          Xrm.Page.getAttribute("axx_campana").setValue(lookup);

          var grupoderesultadosdellamada = campana[0].d.results[0].axx_grupoderesultadosdellamada;
          processPhoneCallResultGroup(grupoderesultadosdellamada);
        }
      }
      if (contact[0] && contact[0].d) {
        if (contact[0].d.results[0] && contact[0].d.results[0].ContactId) {
          lookup = newLookupValue(contact[0].d.results[0].ContactId, "contact", contact[0].d.results[0].FullName);
          Xrm.Page.getAttribute(tofrom).setValue(lookup);
        }
      }
      Xrm.Page.getControl("description").setFocus();
    }).fail(function () {
      alert("Hubo un error al buscar el contacto o la campaña");
    });
  } else {
    SetPCResultGroup();
  }
}



