angular.module('myApp')
    .controller('enginerCtrl', enginers);


function enginers($scope, $state, $auth, $http, localStorageService, restService) {
    console.log("enginersCtrl is Calling..");

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    }

    // GET restService Call
    var getconfig = {
        // token: localStorageService.get('token')
    };

    restService.getRequest('searchEmployeeByName', getconfig)
        .then(function(response) {
            console.log("employeeData",response.data.employeeList);
            $scope.engineers = response.data.employeeList;
        });
};
