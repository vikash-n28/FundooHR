angular.module('myApp')
    .controller('perEnggCtrl', personal);

function personal($scope,$rootScope, $state, $auth, $stateParams, $http,restService) {
    console.log("Engineers Personal is calling !!");

    //Authentication Check
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //Getting Id
    var engineerId = $stateParams.engineerId;


    // GET restService Call
    var getconfig = {
        // token: token,
        engineerId: engineerId
    };

    restService.getRequest('readEmployeePersonalData', getconfig)
        .then(function(data) {
            console.log("employeeData",data.data.personalData);
            $scope.perId =  $stateParams.engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
            $scope.personalArray = data.data.personalData;
            $scope.personalArray.engineerId =  $stateParams.engineerId;
        });


    //Editable Page
    $scope.saveTable = function() {
        //  console.log($scope.personalArray);

        //UPDATING DATA
        restService.putRequest('updateEmployeePersonalData', $scope.personalArray)
            .then(function(response) {
                //console.log("success");
                $state.reload();
            })
    };
}
