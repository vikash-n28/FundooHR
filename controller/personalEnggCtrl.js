angular.module('myApp')
    .controller('perEnggCtrl', personal);

function personal($scope, $rootScope, $state, $auth, $stateParams, $http, restService) {
    console.log("Engineers Personal is calling !!");

    //Authentication Check
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //Getting Id
    var engineerId = $stateParams.engineerId;
    $scope.profileId=engineerId;

    // GET restService Call
    var getconfig = {
        engineerId: engineerId
    };

    restService.getRequest('readEmployeePersonalData', getconfig)
        .then(function(data) {
            console.log("employeeData", data.data.personalData);
            $scope.personalArray = data.data.personalData;
            $scope.personalArray.engineerId = engineerId;
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
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

// function prof() {
//     console.log("ProfileCtrl is Calling..");
//
//
//     // Sliding SideBar Active
//     $("#sidebar-wrapper").click(function() {
//         $(this).toggleClass('active');
//     });
//
//     // toggle Active
//     $('#nav-icon1').click(function() {
//         $(this).toggleClass('open');
//     });
