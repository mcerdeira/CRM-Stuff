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