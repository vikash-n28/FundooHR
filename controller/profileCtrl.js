angular.module('myApp')
    .controller('profileCtrl', profile);


// Calling Profile Function
function profile($scope, $state, $auth,$stateParams) {
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
};
