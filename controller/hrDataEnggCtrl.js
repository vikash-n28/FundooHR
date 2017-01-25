angular.module('myApp')
    .controller('hrDataEnggCtrl', hrDataEngg);

    function hrDataEngg($scope,$state,$auth,$stateParams,$http,localStorageService,restService) {
      console.log("Engineers HRData is calling !!");

      //Authentication Check
      $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
      };
      var token=localStorageService.get('token');
      //Getting Id
      var engineerId = $stateParams.engineerId;

      // GET restService Call
      var getconfig={
          token: token,
          engineerId: engineerId
      };

      restService.getRequest('readEmployeeHRData', getconfig)
      .then(function(data) {
         // console.log("employeeData",data.data.hrData);
         $scope.hrDataArray=data.data.hrData;
         $scope.hrDataArray.token = token;
         $scope.hrDataArray.engineerId = engineerId;
      });


      //Editable Page
       $scope.saveTable = function() {
       console.log($scope.hrDataArray);

       //UPDATING DATA
       restService.putRequest('updateEmployeeHRData',$scope.hrDataArray)
        .then(function(response) {
          //console.log("success");
         $state.reload();
        })
       };
    }
