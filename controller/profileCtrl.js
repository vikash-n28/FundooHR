angular.module('myApp')
    .controller('profileCtrl', prof);


// Calling Profile Function
function prof($scope,$rootScope, $state, $http, $auth, $window, $stateParams, localStorageService, restService) {
    console.log("ProfileCtrl is Calling..");


    // Sliding SideBar Active
    $("#sidebar-wrapper").click(function() {
        $(this).toggleClass('active');
    });

    // toggle Active
    $('#nav-icon1').click(function() {
        $(this).toggleClass('open');
    });

    // check authentication
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //Getting Id
    var engineerId = $stateParams.engineerId;

    // GET restService Call
    var getconfig = {
        // token: localStorageService.get('token'),
        engineerId: engineerId
    };
    restService.getRequest('readEmployeeProfileData', getconfig)
        .then(function(data) {
            console.log("employeeData",data.data.profileData);
            $rootScope.employeeArray = data.data.employeeData;
            $rootScope.profileId = engineerId;
            $scope.employeeArray = data.data.employeeData;
            $scope.profileId = engineerId;
        });
    //$state.go('home.summary.personal');
};
