/**
 *restservice rest call with baseUrl
 *@define service
 *@param {string} restservice - parameter refers  to the service used to controller
 */
angular.module('myApp').service('restService', restService);

/**
 *@method restService - function for request
 *@param {function} selfInvoked - dependencies added
 */
function restService($http, $log, $q, $state,localStorageService) {
    var baseUrl = "http://192.168.0.62:3000/";
    var token = localStorage.getItem("satellizer_token");//.get('token');
    console.log(token);
    /**function for getRequest*/
    this.getRequest = function(path, getconfig) {

        var deferred = $q.defer();
        $http({
                method: "GET",
                url: baseUrl + path,
                params: getconfig,
                headers:{
                  'x-token': token
                }

            }).then(function(data) {
                //sending data...
                deferred.resolve(data);
            }),
            function(msg, code) {
                deferred.reject(msg);

                $log.error(msg, code);
            };
        return deferred.promise;
    };

    /**function for putRequest*/
    this.putRequest = function(path, putconfig) {
        var deferred = $q.defer();

        $http({
                method: "PUT",
                url: baseUrl + path,
                data: putconfig

            }).then(function(data) {
                //sending data...
                deferred.resolve(data);
            }),
            function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            };
        return deferred.promise;
    };
};
