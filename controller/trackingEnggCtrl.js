angular.module('myApp')
    .controller('trackingEnggCtrl', trackingEngg);

function trackingEngg($scope,$rootScope, $state, $auth, $stateParams, $http, $q, restService) {
    console.log("Engineers Bank is calling !!");


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

    restService.getRequest('readEmployeeTrackingData', getconfig)
        .then(function(data) {
            // console.log("employeeData",data.data.trackingData);
            $scope.trackArray = data.data.trackingData;
            $scope.trackArray.engineerId = engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
        });


    //Editable Page
    $scope.saveTable = function() {
        console.log($scope.trackArray);

        //UPDATING DATA
        restService.putRequest('updateEmployeeTrackingData', $scope.trackArray)
            .then(function(response) {
                //console.log("success");
                $state.reload();
            })
    };
}
