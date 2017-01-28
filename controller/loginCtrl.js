/**
 *login controller
 *@define controller
 *@param {string} loginCtrl - controller refer to the controller used by HTML element
 *@param {function} selfInvoked - dependencies added
 *@param {service} $scope - application refer to application model
 *@param {service} $auth - satellizer service
 *@param {service} $state - state routing
 *@param {service} localStorageService - maintain a seperate storage area untill browser is closed
 *@param {service} $rootScope - provide event emission/broadcast and subscription facilit
 */
angular.module('myApp')
    .controller('loginCtrl', function($scope, $auth, localStorageService, $rootScope, $state) {

        /**email and password pattern*/
        $scope.emailFormat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        $scope.passformate = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        /**config json*/
        var config = {
            method: 'POST',
            url: 'http://192.168.0.62:3000/login'
        };

        /**
         *@method login - function to login
         */
        $scope.login = function() {
            
            /**Shows loading spinner*/
            $scope.dataloading = true;

            /**user json*/
            var user = {
                emailId: $scope.email,
                password: $scope.password
            }

            /**user.email*/
            $rootScope.user = $scope.email;

            /**satellizer service*/
            $auth.login(user, config)
                .then(function(data) {
                    localStorageService.set('token', data.data.token); //set localstorage token
                    $state.go('home.dashboard');
                })

                .catch(function(error) {
                    $scope.dataloading = false;
                    $scope.error = "Incorrect email / password !"; //error msg display to HTML page
                });
        };

    });
