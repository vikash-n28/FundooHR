angular.module('myApp')
  .controller('loginCtrl', function($scope, $auth, $state, localStorageService, $rootScope) {

    //email and password pattern
    $scope.emailFormat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    $scope.passformate = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    var config = {
        method: 'POST',
        url: 'http://192.168.0.17:3000/login'
    };

    $scope.login = function() {

        // Show loading spinner.
        $scope.dataloading = true;

        var user = {
                emailId: $scope.email,
                password: $scope.password     //password > Bridge@123
            }

        $rootScope.user = $scope.email;
        console.log($rootScope.user);
        $auth.login(user, config)
            .then(function(data) {
                // console.log("auth.login Data", data.data);
                localStorageService.set('token', data.data.token);
                $state.go('home.dashboard');

            })
            .catch(function(error) {
                $scope.dataloading = false;

                // console.log(error.data.message, error.status);
                // $state.reload();
                $scope.error = "Incorrect email / password !";

            });

    };

});
