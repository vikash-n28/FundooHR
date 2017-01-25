angular.module('myApp')
    .controller('proEnggCtrl', profileEngg);

    function profileEngg($scope,$state,$auth,$stateParams,$http,localStorageService,restService) {
      console.log("Engineers Profile is calling !!");

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

      restService.getRequest('readEmployeeProfileData', getconfig)
      .then(function(data) {
         // console.log("employeeData",data.data.profileData);
         $scope.profileEngArray=data.data.profileData;
         $scope.profileEngArray.token = token;
         $scope.profileEngArray.engineerId = engineerId;
      });

      //Editable Page
       $scope.saveTable = function() {
       console.log($scope.profileEngArray);

       //UPDATING DATA
       restService.putRequest('updateEmployeeProfileData',$scope.profileEngArray)
        .then(function(response) {
          //console.log("success");
         $state.reload();
        })
       };
    }
