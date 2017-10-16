function showAlert(message){
    var notificationsArea = document.getElementById('crmNotifications');
    if (notificationsArea == null) {
        alert(message);
    }else{
       notificationsArea.AddNotification("1230000321", 2, "ribbonButton", message); 
    }
}

function hideAlert(){
    var notificationsArea = document.getElementById('crmNotifications');
    if (notificationsArea != null) {
        notificationsArea.SetNotifications("1230000321", "ribbonButton");
    }    
}