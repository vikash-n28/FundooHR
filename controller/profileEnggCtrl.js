angular.module('myApp')
    .controller('proEnggCtrl', profileEngg);

function profileEngg($scope,$rootScope, $state, $auth, $stateParams, $http, restService) {
    //Authentication Check
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //Getting Id
    var engineerId = $stateParams.engineerId;

    // GET restService Call
    var getconfig = {
        engineerId: engineerId
    };

    restService.getRequest('readEmployeeProfileData', getconfig)
        .then(function(data) {
            // console.log("employeeData",data.data.profileData);
            $scope.profileEngArray = data.data.profileData;
            $scope.profileEngArray.engineerId = engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
        });

    //Editable Page
    $scope.saveTable = function() {
        console.log($scope.profileEngArray);

        //UPDATING DATA
        restService.putRequest('updateEmployeeProfileData', $scope.profileEngArray)
            .then(function(response) {
                //console.log("success");
                $state.reload();
            })
    };
}
