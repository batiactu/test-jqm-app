'use strict';

angular.module('myApp.restServices', ['ngResource'])
    .factory('Employee', ['$resource',
        function ($resource) {
            return $resource('http://recherche.batiactu.com/test_mobile/version1employes/services/emplyee.php?id=:employeeId', {});
        }])

    .factory('Report', ['$resource',
        function ($resource) {
            return $resource('http://recherche.batiactu.com/test_mobile/version1employes/services/emplyee.php?id=:employeeId/reports', {});
        }]);