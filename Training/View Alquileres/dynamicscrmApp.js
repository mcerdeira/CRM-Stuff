// dynamicscrmApp.js
// this module has a dependency on our angularDynamicsCRM module
var CrmApp = angular.module('crmApp', ['angularDynamicsCRM']);

// create a controller for the page, and inject our DynamicsCRMService into it
CrmApp.controller('AppController', function ($scope, DynamicsCRMService) {

    // $scope is what will be available to our HTML
    $scope.inputText = '';
    $scope.matches = [];

    // a change handler for our user input
    $scope.loadAlquileres = function () {
        var CRMguid = window.parent.Xrm.Page.data.entity.getId();

        // call DynamicsCRMService to look up contacts
        DynamicsCRMService.lookup(
            { entitySet: 'new_socioSet', guid: CRMguid },
            function (response) {
                // assign the results to $scope                
                var data = response.d;
                if(data.results)
                {
                    $scope.matches = data.results;
                }
                else
                {
                    $scope.matches = data;
                }
            });
    }
});