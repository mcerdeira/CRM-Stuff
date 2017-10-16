// https://msdn.microsoft.com/en-us/library/gg328474.aspx

function Alerter()
{
    // alert con callback
    Xrm.Utility.alertDialog("Test",function(){alert("otro alert");});
 
    // Abrir ventana de creación
    Xrm.Utility.openQuickCreate("account", Xrm.Page.data.entity.getEntityReference(), {name: "Child!"}).then(function(){alert("1");}, function(){alert("2");});
       
    // Abrir form de la entidad
    Xrm.Utility.openEntityForm("new_alquiler");
       
    // Valor de campo
    var value = Xrm.Page.getAttribute("name").getValue();
    alert(value); 
    
    // Valor de label
    alert(Xrm.Page.getControl("telephone1").getLabel());

    // Current GUID
    alert(Xrm.Page.data.entity.getId());
        
    // Notificacion
    Xrm.Page.getControl("name").setNotification("Hola " + value );
    
    // Setear valor de Lookup
    Xrm.Page.getAttribute("msdyn_billingaccount").setValue([{ id: "{475B158C-541C-E511-80D3-3863BB347BA8}", name: "A. Datu", entityType: "account"}]);

    // Autocompletar campo con comandos
    var commands = {
                    id: "sp_commands",
                    label: "Learn More",
                    action: function () {
                        // Specify what you want to do when the user
                        // clicks the "Learn More" link at the bottom
                        // of the auto-completion list.
                        // For this sample, we are just opening a page
                        // that provides information on working with
                        // accounts in CRM.
                        window.open("http://www.microsoft.com/en-us/dynamics/crm-customer-center/create-or-edit-an-account.aspx");
                    }
                };
    var auto = {commands: commands, results: new Array({id:0, fields:["Uno"]}, {id:1, fields:["Dos"]}) };
    Xrm.Page.getControl("telephone1").showAutoComplete(auto);   
}