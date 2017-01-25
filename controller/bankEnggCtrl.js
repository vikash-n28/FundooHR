angular.module('myApp')
    .controller('bankEnggCtrl', bankEngg);

    function bankEngg($scope,$state,$auth,$stateParams,$http,localStorageService,restService) {
      console.log("Engineers Bank is calling !!");

      //Authentication Check
      $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
      };
       var token=localStorageService.get('token');
      // getting Engineer ID
      var engineerId = $stateParams.engineerId;

      // GET restService Call
      var getconfig={
          token: token,
          engineerId: engineerId
      };

      restService.getRequest('readEmployeeBankData', getconfig)
      .then(function(data) {
         // console.log("employeeData",data.data.bankData);
         $scope.bankArray=data.data.bankData;
         $scope.bankArray.token = token;
         $scope.bankArray.engineerId = engineerId;
      });

      //Editable Page
       $scope.saveTable = function() {
       console.log($scope.bankArray);

       //UPDATING DATA
       restService.putRequest('updateEmployeeBankData',$scope.bankArray)
        .then(function(response) {
          //console.log("success");
         $state.reload();
        })
       };

    }
