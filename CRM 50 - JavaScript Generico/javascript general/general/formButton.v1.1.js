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