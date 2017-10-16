function OpenNewContact() {
    //Set the Parent Customer field value to “Contoso”.
    var extraqs = "&address1_addresstypecode=3";	
	extraqs += "parentcustomerid={F01F3F6D-896E-DF11-B414-00155DB1891A}";	
    //Set text in the Description field.
    extraqs += "&lastname=cocomiel";
    //Set Do not allow E-mails to "Do Not Allow".
    extraqs += "&donotemail=1";
    //Set features for how the window will appear.
    var features = "location=no,menubar=no,status=no,toolbar=no";
    // Open the window.
    window.open("/main.aspx?etn=contact&pagetype=entityrecord&extraqs=" +
     encodeURIComponent(extraqs), "_blank", features, false);
}