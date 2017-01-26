angular.module('myApp')
    .controller('perEnggCtrl', personal);

    function personal($scope,$state,$auth,$stateParams,$http,localStorageService,restService) {
      console.log("Engineers Personal is calling !!");

      //Authentication Check
      $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
      };

      //Getting localStorage 
      var token= localStorageService.get('token');

      //Getting Id
      var engineerId = $stateParams.engineerId;


      // GET restService Call
      var getconfig={
          token: token,
          engineerId: engineerId
      };

      restService.getRequest('readEmployeePersonalData', getconfig)
      .then(function(data) {
        // console.log("employeeData",data.data.personalData);
        $scope.perId=engineerId;
        $scope.personalArray = data.data.personalData;
        $scope.personalArray.token = token;
        $scope.personalArray.engineerId = engineerId;
      });


      //Editable Page
       $scope.saveTable = function() {
      //  console.log($scope.personalArray);

       //UPDATING DATA
       restService.putRequest('updateEmployeePersonalData',$scope.personalArray)
        .then(function(response) {
          //console.log("success");
         $state.reload();
        })
       };
    }
