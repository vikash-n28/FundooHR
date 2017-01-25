angular.module('myApp').service('restService', restService);

function restService($http,$log,$q,$state) {
   var baseUrl = "http://192.168.0.17:3000/";

   //    function for GET
   this.getRequest = function (path, getconfig) {

       var deferred = $q.defer();
       // console.log(query)
       $http({
           method: "GET",
           url: baseUrl + path,
           params: getconfig

       }).then(function (data) {
           //sending data...
           deferred.resolve(data);
       }), function (msg, code) {
           deferred.reject(msg);

           $log.error(msg, code);
       };
       return deferred.promise;
   };

//function to PUT

this.putRequest = function (path, putconfig) {
  var deferred = $q.defer();

  $http ({
    method: "PUT",
    url: baseUrl + path,
    data: putconfig

  }).then(function (data) {
      //sending data...
      deferred.resolve(data);
  }),function (msg, code) {
      deferred.reject(msg);
      $log.error(msg, code);
  };
  return deferred.promise;
  };
};
