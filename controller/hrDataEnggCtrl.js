angular.module('myApp')
    .controller('hrDataEnggCtrl', hrDataEngg);

function hrDataEngg($scope, $rootScope, $state, $auth, $stateParams, $http, restService) {
    console.log("Engineers HRData is calling !!");

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

    restService.getRequest('readEmployeeHRData', getconfig)
        .then(function(data) {
            // console.log("employeeData",data.data.hrData);
            $scope.hrDataArray = data.data.hrData;
            $scope.hrDataArray.engineerId = engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
        });


    //Editable Page
    $scope.saveTable = function() {
        console.log($scope.hrDataArray);

        //UPDATING DATA
        restService.putRequest('updateEmployeeHRData', $scope.hrDataArray)
            .then(function(response) {
                //console.log("success");
                $state.reload();
            })
    };
}
