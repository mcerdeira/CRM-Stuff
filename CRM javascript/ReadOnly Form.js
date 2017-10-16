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
 
function setupForm(){

    if (Xrm.Page.ui.getFormType() == 2 && 
        Xrm.Page.getAttribute("incidentstagecode").getValue() != null &&
        Xrm.Page.getAttribute("incidentstagecode").getValue() == "200001") {

           disableFormFields(true);

    }
}