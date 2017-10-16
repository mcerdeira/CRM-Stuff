// angularDynamicscrm.js
// create a module with a dependency on ngResource which
// provides interaction support with RESTful services via the $resource service.
var angularDynamicsCRM = angular.module('angularDynamicsCRM', ['ngResource']);

// define the DynamicsCRMService factory
angularDynamicsCRM.factory('DynamicsCRMService', function ($resource) {
    var oDataUrl = window.parent.Xrm.Page.context.getClientUrl() + '/XRMServices/2011/OrganizationData.svc/';

    var defaultParams = {};

    // describe our API actions
    var actions = {
        lookup: {
            method: 'GET',
            url: oDataUrl + ':entitySet(guid\':guid\')'
        }
    };

    // create the service
    return $resource(oDataUrl, defaultParams, actions);
});