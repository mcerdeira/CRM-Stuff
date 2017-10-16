private string getItemPresupuestoId(string Id, IOrganizationService service)
{
    string retVal = "";
    string consultarDatos = @" 
    <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "<entity name='new_presupuestodeinversion'>" +
                "<attribute name='exchangerate'/>" +
            "<filter type='and'>" +
                "<condition attribute='new_itemdepresupuestodeinversinid' operator='eq' value='" + Id + "' />" +
            "</filter>" +
        "</entity>" +
    "</fetch>";

    EntityCollection resultado = service.RetrieveMultiple(new FetchExpression(consultarDatos));
    foreach (var c in resultado.Entities)
    {
        if (c.Attributes.Contains("new_itemdepresupuestodeinversinid"))
        {
            retVal = ((EntityReference)c["new_itemdepresupuestodeinversinid"]).Id.ToString();
        }
    }
    return retVal;
}