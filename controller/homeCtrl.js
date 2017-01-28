angular.module('myApp')
    .controller('homeCtrl', function($scope, $state, $auth) {

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        // Date Object is create
        $scope.date = new Date();
    });
