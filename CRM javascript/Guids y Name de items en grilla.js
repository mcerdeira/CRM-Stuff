var gridControl = document.getElementById("Unidades_Operativas").control;
var ids = gridControl.get_selectedIds(); 

var name = gridControl.get_selectedRecords()[0].Name;	

alert(ids);