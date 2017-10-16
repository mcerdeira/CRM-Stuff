function OpenNewOrder_PhoneCall() {
	//Busco la organizacion donde estoy trabajando
	var organization = Xrm.Page.context.getOrgUniqueName();
	if (Xrm.Page.getAttribute("axx_campana").getValue() == null ){
	    alert("Debe ingresar campaña");
	    return
	}
	//Tomo los datos de la entida PhoneCall
	var campaniaId = Xrm.Page.getAttribute("axx_campana").getValue()[0].id;
	var campaniaName = Xrm.Page.getAttribute("axx_campana").getValue()[0].name;
	
	if(Xrm.Page.getAttribute("axx_listademarketing").getValue() == null){
		var listaMarketingId = null;
		var listaMarketingName = null;
	}else{
		var listaMarketingId = Xrm.Page.getAttribute("axx_listademarketing").getValue()[0].id;
		var listaMarketingName = Xrm.Page.getAttribute("axx_listademarketing").getValue()[0].name;
	}
	var directionCode = Xrm.Page.getAttribute("directioncode").getValue(); //True=Outgoing - False=Incoming
	
	//Seteo los valores por defecto de algunos campos
	var extraqs = "&axx_campanaid=" + campaniaId;
	extraqs += "&axx_campanaidname=" + campaniaName;
	if(listaMarketingId){
		extraqs += "&axx_listademarketing=" + listaMarketingId;
		extraqs += "&axx_listademarketingname=" + listaMarketingName;
	}
	
  //NuevoPedido=2 ; Pedido=0; Reenvío=1;
  extraqs += "&axx_tipopedido=0";
	
  //Parametro extra del formulario:
  extraqs += "&axx_esNuevo=" + true;
  
	//Promocion por defecto
	//extraqs += "&axx_promocionid=" + camposDefault;
	
	if (!directionCode)
	{
		if(Xrm.Page.getAttribute("from").getValue() == null)
		{
			var customerId = null;
		}else{			
			var customerId = Xrm.Page.getAttribute("from").getValue()[0].id; //Sender
			var customerName = Xrm.Page.getAttribute("from").getValue()[0].name; //Sender Name
			var customerType = Xrm.Page.getAttribute("from").getValue()[0].entityType; //Recipient Type
		}
	}else{
		if(Xrm.Page.getAttribute("to").getValue() == null)
		{
			var customerId = null;
		}else{			
			var customerId = Xrm.Page.getAttribute("to").getValue()[0].id; //Recipient
			var customerName = Xrm.Page.getAttribute("to").getValue()[0].name; //Recipient Name
			var customerType = Xrm.Page.getAttribute("to").getValue()[0].entityType; //Recipient Type
		}
	}				
	if (customerId != null)
	{		
		extraqs += "&customerid=" + customerId;
		extraqs += "&customeridname=" + customerName;
		extraqs += "&customeridtype=" + customerType;
	}
	
	//window.alert(directionCode);
	//window.alert(customerId);
	//window.alert(customerName);
	
	//Configuro los valores con que se va a abrir la ventana
	var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,height=1000,width=1000";

	// Abro la ventana de Suscripciones
	window.open("/" + organization + "/main.aspx?etn=salesorder&pagetype=entityrecord&extraqs=" + encodeURIComponent(extraqs), "_blank", features, false);
}

function OpenNewSuscripcion_PhoneCall() {
	//Busco la organizacion donde estoy trabajando
	var organization = Xrm.Page.context.getOrgUniqueName();
	
	if (Xrm.Page.getAttribute("axx_campana").getValue() == null ){
	    alert("Debe ingresar campaña");
	    return
	}
	
	//Tomo los datos de la entida PhoneCall
	var campaniaId = Xrm.Page.getAttribute("axx_campana").getValue()[0].id;
	var campaniaName = Xrm.Page.getAttribute("axx_campana").getValue()[0].name;
	if(Xrm.Page.getAttribute("axx_listademarketing").getValue() == null){
		var listaMarketingId = null;
		var listaMarketingName = null;
	}else{
		var listaMarketingId = Xrm.Page.getAttribute("axx_listademarketing").getValue()[0].id;
		var listaMarketingName = Xrm.Page.getAttribute("axx_listademarketing").getValue()[0].name;
	}
	
	var directionCode = Xrm.Page.getAttribute("directioncode").getValue(); //True=Outgoing - False=Incoming
	
	if (!directionCode){
		if (Xrm.Page.getAttribute("from").getValue() == null){
			var customerId = null;	
		}else{
			var customerId = Xrm.Page.getAttribute("from").getValue()[0].id; //Sender
			var customerName = Xrm.Page.getAttribute("from").getValue()[0].name; //Sender Name
			var customerType = Xrm.Page.getAttribute("from").getValue()[0].entityType; //Recipient Type
		}
	}else{
		if (Xrm.Page.getAttribute("to").getValue() == null){
			var customerId = null;
		}else{
			var customerId = Xrm.Page.getAttribute("to").getValue()[0].id; //Recipient
			var customerName = Xrm.Page.getAttribute("to").getValue()[0].name; //Recipient Name
			var customerType = Xrm.Page.getAttribute("to").getValue()[0].entityType; //Recipient Type
		}
	}
			
	//Seteo los valores por defecto de algunos campos
	var extraqs = "&axx_campanaid=" + campaniaId;
	extraqs += "&axx_campanaidname=" + campaniaName;
	
	if(listaMarketingId != null){
		extraqs += "&axx_listademarketing=" + listaMarketingId;
		extraqs += "&axx_listademarketingname=" + listaMarketingName;
	}
		
	if (customerId != null){
		//Configuro el tipo 
		if (customerType == "account")
		{
			extraqs += "&axx_tipodecliente=1";
			extraqs += "&axx_accountid=" + customerId;
			extraqs += "&axx_accountidname=" + customerName;
		}else{
			extraqs += "&axx_tipodecliente=0";
			extraqs += "&axx_contactid=" + customerId;
			extraqs += "&axx_contactidname=" + customerName;
		}
	}
	
	//Configuro los valores con que se va a abrir la ventana
	var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes,height=1000,width=1000";


	// Abro la ventana de Suscripciones
	window.open("/" + organization + "/main.aspx?etn=axx_suscripcion&pagetype=entityrecord&extraqs=" + encodeURIComponent(extraqs), "_blank", features, false);
}

function regardingIsClient(){
  var ro = Xrm.Page.getAttribute("regardingobjectid").getValue();
  var isClient = false;
  
  if(ro && ro[0]){ 
    if(ro[0].entityType == "account" || ro[0].entityType == "contact" ){
      isClient = true;
    }
  }
  
  return isClient
}


function OpenNewOrder_Task() {
	//Busco la organizacion donde estoy trabajando
	var organization = Xrm.Page.context.getOrgUniqueName();
	
  var ro = Xrm.Page.getAttribute("regardingobjectid").getValue();
    
  if(regardingIsClient()){
    //Tomo los datos de la entida Task
    var customerId   = ro[0].id;
    var customerName = ro[0].name;
    var customerType = ro[0].entityType;
    
    //Seteo los valores por defecto de algunos campos
    var extraqs = "&customerid=" + customerId;
    extraqs += "&customeridname=" + customerName;
    extraqs += "&customeridtype=" + customerType;
    
    //Configuro los valores con que se va a abrir la ventana
    var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes";

    // Abro la ventana de Suscripciones
    window.open("/" + organization + 
                "/main.aspx?etn=salesorder&pagetype=entityrecord&extraqs=" + 
                encodeURIComponent(extraqs), "_blank", features, false);
  }else{
    alert("El registro relacionado debe ser un Contacto o una Cuenta para abrir un nuevo Pedido desde esta ventana" )
  }
}

function OpenNewSuscripcion_Task() {
	//Busco la organizacion donde estoy trabajando	
	var organization = Xrm.Page.context.getOrgUniqueName();
	
  if( regardingIsClient() ){
    //Tomo los datos de la entidad Task
    var customerId = Xrm.Page.getAttribute("regardingobjectid").getValue()[0].id;
    var customerName = Xrm.Page.getAttribute("regardingobjectid").getValue()[0].name;
    var customerType = Xrm.Page.getAttribute("regardingobjectid").getValue()[0].entityType; ;
    
    //Seteo los valores por defecto de algunos campos
    if (customerType == "account")
    {
      var extraqs = "&axx_tipodecliente=1";
      extraqs += "&axx_accountid=" + customerId;
      extraqs += "&axx_accountidname=" + customerName;
    }else{
      var extraqs = "&axx_tipodecliente=0";
      extraqs += "&axx_contactid=" + customerId;
      extraqs += "&axx_contactidname=" + customerName;
    }
    
    //Configuro los valores con que se va a abrir la ventana
    var features = "location=no,menubar=no,status=no,toolbar=no,resizable=yes";      

    // Abro la ventana de Suscripciones
    window.open("/" + organization + "/main.aspx?etn=axx_suscripcion&pagetype=entityrecord&extraqs=" + encodeURIComponent(extraqs), "_blank", features, false);
  }else{
      alert("El registro relacionado debe ser un Contacto o una Cuenta para abrir una nueva Suscripción desde esta ventana" )
  }
}