// Manually connect

Uri realm = new Uri("https://dev-365.*****/******/XRMServices/2011/Organization.svc");
var clientCredentials = new ClientCredentials();
clientCredentials.Windows.ClientCredential.UserName = "mcerdeira";
clientCredentials.Windows.ClientCredential.Password = "*******";
clientCredentials.Windows.ClientCredential.Domain = "*********";

// Or

CrmServiceClient CRMSvc;
string cns = crmConnectionString;
CRMSvc = new CrmServiceClient(cns);
OrganizationServiceContext context = new OrganizationServiceContext(CRMSvc.OrganizationServiceProxy);
