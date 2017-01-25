angular.module('myApp')
    .controller('trackingEnggCtrl', trackingEngg);

    function trackingEngg($scope,$state,$auth,$stateParams,$http,$q,localStorageService,restService) {
      console.log("Engineers Bank is calling !!");


      //Authentication Check
      $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
      };


      var token= localStorageService.get('token');
      //Getting Id
      var engineerId = $stateParams.engineerId;

      // GET restService Call
      var getconfig={
          token: token,
          engineerId: engineerId
      };

      restService.getRequest('readEmployeeTrackingData', getconfig)
      .then(function(data) {
         // console.log("employeeData",data.data.trackingData);
         $scope.trackArray=data.data.trackingData;
         $scope.trackArray.token = token;
         $scope.trackArray.engineerId = engineerId;
      });


       //Editable Page
        $scope.saveTable = function() {
        console.log($scope.trackArray);

        //UPDATING DATA
        restService.putRequest('updateEmployeeTrackingData',$scope.trackArray)
         .then(function(response) {
           //console.log("success");
          $state.reload();
         })
        };
    }
