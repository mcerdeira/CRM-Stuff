// dynamicscrmApp.js
// this module has a dependency on our angularDynamicsCRM module
var CrmApp = angular.module('crmApp', ['angularDynamicsCRM']);

// create a controller for the page, and inject our DynamicsCRMService into it
CrmApp.controller('AppController', function ($scope, DynamicsCRMService) {

    // $scope is what will be available to our HTML
    $scope.inputText = '';
    $scope.matches = [];

    // a change handler for our user input
    $scope.inputChanged = function () {
        if (!$scope.inputText) {
            $scope.matches = [];
            return;
        }

        // call DynamicsCRMService to look up contacts
        DynamicsCRMService.lookup(
            { entitySet: 'ContactSet', field: 'FullName', search: $scope.inputText },
            function (response) {
                // assign the results to $scope
                var data = response.d;
                $scope.matches = data.results;
            });
    }
});