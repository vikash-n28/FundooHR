/**
 *logout controller
 *@define controller
 *@param {function} selfInvoked - dependencies added
 */
angular.module('myApp')
    .controller('logoutCtrl', function($location, $auth) {
        if (!$auth.isAuthenticated()) {
            return;
        }
        /**satellizer service*/
        $auth.logout()
            .then(function() {
                console.log("You have been logged out");
                $location.path('/login');
            });
    });
