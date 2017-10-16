function crear_botones () {

         ConvertToButton("s21_botoncarreras", "Carreras","100px","Carreras", generarVistaCarreras);
         ConvertToButton("s21_botonagregar", "Otras Carreras","100px","Otras Carreras", generarVistaOtrasCarreras);
		 ConvertToButton("s21_boton_ws", "Informe","100px","Informe", abrirPopupInforme);

}

function abrirPopupInforme(){
	
}


function ConvertToButton(fieldname, buttontext, buttonwidth,title, functiontocall)
{
	if (document.getElementById(fieldname) == null)
	{
                              alert('Error al crear botón Carreras');
                              return;
	}

                     Xrm.Page.getControl(fieldname).setVisible(true);


//	functiontocall=buscarCarreras;
	crmForm.all[fieldname].DataValue = buttontext;
	crmForm.all[fieldname].readOnly = true;
	crmForm.all[fieldname].style.borderRight="#3366cc 1px solid";
	crmForm.all[fieldname].style.paddingRight="5px";
	crmForm.all[fieldname].style.borderTop="#3366cc 1px solid";
	crmForm.all[fieldname].style.paddingLeft="5px";
	crmForm.all[fieldname].style.fontSize="11px";
	crmForm.all[fieldname].style.backgroundImage="url(/_imgs/btn_rest.gif)";
	crmForm.all[fieldname].style.borderLeft="#3366cc 1px solid";
	crmForm.all[fieldname].style.width=buttonwidth;
	crmForm.all[fieldname].style.cursor="hand";
	crmForm.all[fieldname].style.lineHeight="18px";
	crmForm.all[fieldname].style.borderBottom="#3366cc 1px solid";
	crmForm.all[fieldname].style.backgroundRepeat="repeat-x";
	crmForm.all[fieldname].style.fontFamily="Tahoma";
	crmForm.all[fieldname].style.height="20px";
	crmForm.all[fieldname].style.backgroundColor="#cee7ff";
	crmForm.all[fieldname].style.textAlign="center";
	crmForm.all[fieldname].style.overflow="hidden";
	crmForm.all[fieldname].attachEvent("onmousedown",push_button);
	crmForm.all[fieldname].attachEvent("onmouseup",release_button);
	crmForm.all[fieldname].attachEvent("onclick",functiontocall);
	crmForm.all[fieldname].style.lineHeight="14px";
	crmForm.all[fieldname+'_c'].style.visibility = 'hidden';
	crmForm.all[fieldname].title=title;

	window.focus();
	function push_button()
	{
		window.event.srcElement.style.borderWidth="2px";
		window.event.srcElement.style.borderStyle="groove ridge ridge groove";
		window.event.srcElement.style.borderColor="#3366cc #4080f0 #4080f0 #3366cc";
	}
	function release_button()
	{
		window.event.srcElement.style.border="1px solid #3366cc";
	}
}