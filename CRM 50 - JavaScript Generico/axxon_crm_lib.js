/*
#########################################
#########################################
new_axxon_generico.js   #################
#########################################
#########################################
*/


function lookup2text(lookupItem){
/*
Devuelve el texto visible de un campo lookup
*/    
    var temparray = new Array(); 
    temparray = lookupItem;
    debugger;
    if (temparray != null){
        var retVal = temparray[0].name; 
    }else{   
        var retVal = "";
    }
    return retVal;
}


function lookup2guid(lookupItem){
/*
Devuelve el guid de un campo lookup
*/    
    var temparray = new Array(); 
    temparray = lookupItem;
    if (temparray != null){
        var retVal = temparray[0].id; 
    }else{   
        var retVal = "";
    }
    return retVal;
}


function numCRM(num){
   if(num == null){
       num = 0;
   }
   return num;
}


function strCRM(str){
   if(str == null){
       str = "";
   }
   return str;
}


function allNulls(fields){
/*
Recorre una lista de campos, y devuelve True si todos son nulos
*/
    var alln = true;
	for (i=0;i<=fields.length-1;i++){        
        if (Xrm.Page.getAttribute(fields[i]).getValue() != null ){
			alln = false;
		}    
    }
    return alln;
}


function setInvisible(field){
/*
Pone invisible un campo, si está vacío
*/
	if (Xrm.Page.getAttribute(field).getValue() == null ){
		Xrm.Page.ui.controls.get(field).setVisible(false);
	}
}


function isNumber(n) { 
/*
Devuelve True, si todos los caracteres de una cadena son numeros
*/
  return !isNaN(parseFloat(n)) && isFinite(n); 
} 


function isLetters(str){
/*
Devuelve True, si todos los caracteres de una cadena son letras
*/
    for(i=0;i<str.length;i++){
        if(isNumber(str[i])){
            return false;  
        } 
    }
    return true;
}

function ODataSelect(entity, fields, filter){  	
/*
Funcion generica para hacer selects con OData
<entity>: Nombre de entidad, sin "Set" 
<fields>: campos, separados por coma
<filter>: filtro con sintaxis de OData
*/
  var retVal;
  var organizationName = Xrm.Page.context.getOrgUniqueName();
  var serverURL = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + organizationName;
  var odataSelect = serverURL + "/xrmservices/2011/OrganizationData.svc/" + entity + "Set?" + 
  "$select=" + fields + "&" +  
  "$filter=" + filter; 
   
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    url: odataSelect,
    async: false,
    beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader("Accept", "application/json"); },
    success: function (data, textStatus, XmlHttpRequest){
          if(data.d.results.length == 0){
            alert(errorMssg);
            return
          }          
          retVal = data.d.results[0];          
          return;
        },
    error: function (XmlHttpRequest, textStatus, errorThrown) { alert('OData Select Failed: ' + odataSelect); }
  });
  return retVal;
}

/*
#########################################
#########################################
generalFunctions.js    ##################
#########################################
#########################################
*/

function getAttributeValue(fieldName, sep){
  var attribute = Xrm.Page.getAttribute(fieldName);
  var fieldValue = "";
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


// Create Dynamic Button for CRM 5
function removeChildNodes(ctrl)
{ 
	while (ctrl.childNodes[0]) 
	{ 
		ctrl.removeChild(ctrl.childNodes[0]); 
	}
}
 
function CreateButtonCRM5(fieldName, buttonText, buttonWidth, iconName, clickEvent)
{
	functiontocall=clickEvent;
	crmForm.all.item(fieldName + "_c").style.display = "none";
 
	var li = document.createElement("LI");
	li.setAttribute('id', fieldName + 'LI');
	li.setAttribute('className', 'ms-crm-Menu');
	li.setAttribute('title', buttonText);
	li.setAttribute('onclick', functiontocall);
	li.setAttribute('onmousedown', push_custom_button);
	li.setAttribute('onmouseup', release_custom_button);
	li.style.width=buttonWidth;
	li.style.cursor="hand";
	li.style.textAlign="center";
	li.style.overflow="hidden";
 
	var span = document.createElement("span");
	span.setAttribute('className', 'ms-crm-Menu-Label');
	span.setAttribute('id', fieldName + 'Span');
	//span.style.cursor = "hand";
  li.style.listStyleImage = "url('/_imgs/ico/" + iconName + "')";
  
	li.appendChild(span);
	li.onmouseover = function() { li.setAttribute('className', 'ms-crm-Menu-Label-Hovered'); }
	li.onmouseout = function() { li.setAttribute('className', 'ms-crm-Menu-Label'); }
 
	var a = document.createElement("a");
	a.setAttribute('id', fieldName + 'A');
	a.setAttribute('className', 'ms-crm-Menu-Label');
	a.onclick = function() { return false; }
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
 
function push_custom_button()
{
	window.event.srcElement.style.marginLeft="1px";
	window.event.srcElement.style.marginTop="1px";
}
 
function release_custom_button()
{
	window.event.srcElement.style.marginLeft="0px";
	window.event.srcElement.style.marginTop="0px";
}



//iframeObjId - iframe control schema name
//objectType  - container entity code
//areaName    - related entity area name
//formId      - entity form id (optional)
function SetIframeContent(iframeObjId, objectType, primaryObjectId, areaName, iframeTitle, formId) 
{    
    //Get iframe control 
    var iframeObject = Xrm.Page.getControl(iframeObjId);
    if (iframeObject != null) 
    {
        //assemble URL
        var strURL = "areas.aspx?formid=" + formId + "&navItemName=" + iframeTitle + "&oId=" + primaryObjectId + "&oType=" + objectType + "&pagemode=iframe&security=852023&tabSet=" + areaName;
        //Set iframe URL
        iframeObject.setSrc(strURL);
    }
}

function RefreshRibbon() 
{ 
    //Xrm.Page.ui.navigation.items.get()[0].setFocus(); 
    //Xrm.Page.ui.tabs.get()[0].setFocus(); 
	loadArea('areaProcessSessions');
	loadArea('areaForm');crmForm.GetTab($get('tab0', crmForm), true); 
}


function setWindowSize(){
  var currentWidth = 630, currentHeight = 460, minimunHeight = 550, minimunWidth = 1220, x = 2, y = 0;

  if (document.body && document.body.offsetWidth) {
   currentWidth = window.top.document.body.offsetWidth;
   currentHeight = window.top.document.body.offsetHeight;
  }
  if (document.compatMode=='CSS1Compat' &&
      window.top.document.documentElement &&
      window.top.document.documentElement.offsetWidth ) {
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
  
  
  if(currentWidth < minimunWidth){
    x = (screenWidth-minimunWidth) / 2;
    window.top.moveTo(x,y);
    window.top.resizeTo(minimunWidth, currentHeight);
    currentWidth = minimunWidth;
  }
  
  if(currentHeight < minimunHeight){
    x = (screenWidth-currentWidth) / 2;
    window.top.moveTo(x,y);
    window.top.resizeTo(currentWidth, minimunHeight);
  }  
}

function clickRibbon(){
  window.top.document.getElementById("minimizeribbon").fireEvent("onclick");
}

/*
#########################################
#########################################
autoNumber.js   #########################
#########################################
#########################################
*/

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

/*
#########################################
#########################################
hideParts.js  ###########################
#########################################
#########################################
*/

function ocultarNavigationBar(){
  // Hide Left Hand Nav bar / pane
  document.getElementById("crmNavBar").parentElement.style.display = "none";
  document.getElementById("tdAreas").parentElement.parentElement.parentElement.parentElement.colSpan = 2;
}


function ocultarRibbonOnChange(){
// Toggle the Ribbon Toolbar to Show/Hide (same as clicking the show/hide Ribbon button)
//document.getElementById("minimizeribbon").fireEvent("onclick");

$("."+"ms-crm-Form-HeaderContainer").hide(); //Necesita jquery

// Hide the Ribbon Toolbar and move the form Content area to the top of the window.
//document.getElementById("crmRibbonManager").style.display = "none";
//window.top.document.getElementById("crmContentPanel").style.top = "0px"; // Move Form Content area up to top of window, initial style.top is 135px

}

function ocultarRibbonAndBorders(){
  window.parent.document.getElementById("crmTopBar").style.display = "none";
 
  // Move Form Content area up to top of window, initial style.top is 135px
  // set it to the height of the iframe
  window.parent.document.getElementById('crmContentPanel').style.top = "0px";
  window.parent.document.getElementById('crmContentPanel').style.height = "100%";
  
  var thisframe = document.getElementById("tdAreas").parentElement.parentElement.parentElement;
  thisframe.style.border = "0px";
  thisframe.parentElement.style.padding = "0px";
}

function ocultarFooterAndHeader(){
  // Hide the Breadcrumb and Record Set Toolbar
  //document.getElementById("recordSetToolBar").parentElement.style.display = "none";
  var hideToolBar = document.getElementById("recordSetToolBar").parentElement;
  hideToolBar = hideToolBar.parentElement.parentElement.parentElement.parentElement.parentElement;
  hideToolBar = hideToolBar.parentElement.parentElement.parentElement.parentElement.parentElement;
  hideToolBar.style.display = "none";
 
  //$("."+"ms-crm-Form-HeaderContainer").hide(); //Necesita jquery

  // Hide the Form Footer Bar
  document.getElementById("crmFormFooter").parentElement.style.display = "none";
  
  var thisframe = document.getElementById("tdAreas").parentElement.parentElement.parentElement.parentElement;
  thisframe.style.padding = "0px";
}


function HideArea() {
// Hide the Ribbon Toolbar and move the form Content area to the top of the window
  window.parent.document.getElementById("crmTopBar").style.display = "none";
  window.parent.document.getElementById("crmContentPanel").style.top = "0px";

// Move Form Content area up to top of window, initial style.top is 135px
// set it to the height of the iframe
  window.parent.document.getElementById('contentIFrame').style.height = "400px";
 
// Hide Left Hand Nav bar / pane
 document.getElementById("crmNavBar").parentElement.style.display = "none";
 document.getElementById("tdAreas").parentElement.parentElement.parentElement.parentElement.colSpan = 2;
// Hide the Form Footer Bar
 document.getElementById("crmFormFooter").parentElement.style.display = "none";
}

/*
#########################################
#########################################
DateFormat_v1.2.3.js  ###################
#########################################
#########################################
*/

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 *
 * More Info: http://blog.stevenlevithan.com/archives/date-time-format
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
}

/*
#########################################
#########################################
formButton.v1.1.js   ####################
#########################################
#########################################
*/

function noParams() {
  alert("No data parameter was passed to this web resource");
}

function getDataParam() {
  //Get the any query string parameters and load them
  //into the vals array
  var vals = new Array();
  var dataParam = null;

  if(location.search != "") {
    vals = location.search.substr(1).split("&");
    var i;
    for(i in vals) {
      vals[i] = vals[i].replace(/\+/g, " ").split("=");
    }
    //look for the parameter named 'data'
    var found = false;
    var i;
    for(i in vals) {
      if(vals[i][0].toLowerCase() == "data") {
        dataParam = vals[i][1];
        found = true;
        break;
      }
    }
    if(!found) {
      noParams();
    }
  } else {
    noParams();
  }
  return dataParam;
}

function getMyParams(dataParam, parameter) {
  var vals = new Array();
  var parameterValue = "";

  if(typeof dataParam != "undefined" && dataParam != null && dataParam != "") {
    dataParam = decodeURIComponent (dataParam);
    vals = dataParam.split("|");
    var i;
    for(i in vals) {
      vals[i] = vals[i].replace(/\+/g, " ").split("=");
    }
    //look for parameter
    var found = false;
    var i;
    for(i in vals) {
      if(vals[i][0].toLowerCase() == parameter.toLowerCase()) {
        parameterValue = vals[i][1];
      found = true;
      break;
      }
    }
    
    if(!found) {
      parameterValue = null;
    }
    
  }else {
    noParams();
  }
  return parameterValue;
}

function getButtonParameters() {
  var dataParam = getDataParam();

  var bttnParams = null;

  if(dataParam) {
    bttnParams = {
      text: getMyParams(dataParam,"text"),
      onclick: getMyParams(dataParam,"onclick"),
      image: getMyParams(dataParam,"image"),
      tooltip: getMyParams(dataParam,"tooltip"),
      onload: getMyParams(dataParam,"onload"),
      name: getMyParams(dataParam,"name")
    };
  }

  return bttnParams;
}
var crmButton = {};

crmButton.get = function () {
  return document.getElementById("myCrmButton");
};

crmButton.name = "";

crmButton.getName = function () {
  return crmButton.name;
};

crmButton.onOver = function () {
  var myCrmButton = crmButton.get();
  myCrmButton.style.backgroundColor = "RGB(253,238,179)";
  myCrmButton.style.borderStyle = "solid";
  myCrmButton.style.borderColor = "RGB(241,196,63)";
  myCrmButton.style.outline = "none";
  myCrmButton.style.outlineWidth = "0px";
  myCrmButton.blur();
};

crmButton.onOut = function () {
  var myCrmButton = crmButton.get();
  myCrmButton.style.backgroundColor = "";
  myCrmButton.style.borderStyle = "none";
  myCrmButton.style.outline = "none";
  myCrmButton.style.outlineWidth = "0px";
  myCrmButton.blur();
};

crmButton.onActive = function () {
  var myCrmButton = crmButton.get();
  myCrmButton.style.backgroundColor = "#FDEEB3";
  myCrmButton.style.borderStyle = "none";
  myCrmButton.style.borderColor = "#F1C43F";
  myCrmButton.style.outline = "none";
  myCrmButton.style.outlineWidth = "0px";
};

crmButton.Disable = function () {
  crmButton.setDisabled(true);
};

crmButton.Enable = function () {
  crmButton.setDisabled(false);
};

crmButton.setDisabled = function (disabled) {
  var myCrmButton = crmButton.get();

  if(disabled) {
    crmButton.onOut();
    myCrmButton.disabled = true;
    myCrmButton.style.opacity = "0.6";
    myCrmButton.style.filter = "gray(), alpha(opacity=60)";
    myCrmButton.style.zoom = "1";
  } else {
    myCrmButton.disabled = false;
    myCrmButton.style.opacity = "1";
    myCrmButton.style.filter = "";
    myCrmButton.style.zoom = "1";
  }
};

crmButton.setText = function (string_text) {
  var myCrmButton = crmButton.get();
  if(string_text) {
    myCrmButton.value = string_text;
  }
};

crmButton.setOnClick = function (string_onclick) {
  var myCrmButton = crmButton.get();
  if(string_onclick) {
    var myFn = function () {
        eval(string_onclick);
        myCrmButton.style.outline = "none";
      };
    myCrmButton.setAttribute('onclick', myFn);
  }
};

crmButton.setImage = function (string_image) {
  var myCrmButton = crmButton.get();
  if(string_image) {
    myCrmButton.style.backgroundImage = "url('" + "../../" + string_image + "')";
  }
};

crmButton.setToolTip = function (string_tooltip) {
  var myCrmButton = crmButton.get();
  if(string_tooltip) {
    myCrmButton.title = string_tooltip;
  }
};

function onLoad() {
  var myCrmButton = crmButton.get();
  myCrmButton.style.outline = "none";
  myCrmButton.style.outlineWidth = "0px";
  var bp = getButtonParameters();
  //.onclick  .image .text .tooltip .onload .name
  if(typeof parent.getButton == "undefined") {
    parent.getButton = function (string_webResource) {
      var control = parent.Xrm.Page.ui.controls.get(string_webResource);
      var id = control.getObject().id;
      var frame = document.frames[id];
      return frame.crmButton;
    };
  }

  if(bp.name) {
    crmButton.name = bp.name;
  }

  crmButton.setOnClick(bp.onclick);
  crmButton.setText(bp.text);
  crmButton.setImage(bp.image);
  crmButton.setToolTip(bp.tooltip);

  if(bp.onload) {
    var runOnLoad = function() {
        eval(bp.onload);
      };
    runOnLoad();
  }
}

function noOnClick() {
  alert("Form Button: No onclick function has been declared");
}