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
        .then(function(resp) {
            console.log("employeeData",resp.data.employeeList);
            $scope.engineers = resp.data.employeeList;
        });
};
