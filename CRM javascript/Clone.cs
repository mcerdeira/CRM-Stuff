/*
http://social.microsoft.com/Forums/zh/crmdevelopment/thread/ca07e16a-9706-4051-96a5-644e01e0b248

using Xrm Client Extensions someting like this on pre-update entity by cloning entity image:
*/

Guid cloneId = Guid.Empty;
Entity clone = EntityExtensions.Clone(entityImage, false);
clone.Attributes.Remove("new_name");
clone.Attributes.Remove("new_dossierid");
clone.Id = Guid.NewGuid();
cloneId = service.Create(clone);

if (cloneId != Guid.Empty)
{
	if (entity.Attributes.Contains("hli_clonedid"))
		entity.Attributes["hli_clonedid"] = cloneId.ToString();
	else
		entity.Attributes.Add("hli_clonedid", cloneId.ToString());
}
