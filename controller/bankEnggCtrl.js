/**
 *bankEngineers controller
 *@define controller
 *@param {string} bankEnggCtrl - controller refer to the controller used by HTML element
 */
angular.module('myApp')
    .controller('bankEnggCtrl', bankEngg);

/**
 *@method bankEngg - function for bank details
 *@param {function} selfInvoked - dependencies added
 *@param {service}  $stateParams - store information about a url
 *
 */
function bankEngg($scope, $rootScope, $state, $auth, $stateParams, $http, localStorageService, restService) {
    console.log("Engineers Bank is calling !!");

    /**satellizer service*/
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    /**getting engineer Id from paramquery*/
    var engineerId = $stateParams.engineerId;

    /**getconfig json*/
    var getconfig = {
        engineerId: engineerId
    };

    /**restservice use to get  readEmployeeBankData*/
    restService.getRequest('readEmployeeBankData', getconfig)
        .then(function(data) {
            $scope.bankArray = data.data.bankData;
            $scope.bankArray.engineerId = engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
        });

    /**
     *@method saveTable - function to save editable data
     */
    $scope.saveTable = function() {
        console.log($scope.bankArray);

        /**restservice use to updateEmployeeBankData*/
        restService.putRequest('updateEmployeeBankData', $scope.bankArray)
            .then(function(response) {
                $state.reload();
            })
    };

}
