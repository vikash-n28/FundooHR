angular.module('myApp')
    .controller('dashCtrl', dashBoard);

function dashBoard($scope, $http, localStorageService,restService) {
  console.log("dashBoardCtrl is Calling..");

    // Current Date
    $scope.date = new Date();

    // Previous Date
    var dashBoard = new Date();
    $scope.previous = dashBoard.setDate(dashBoard.getDate() - 1);

    //Converting timeStamp received from the Server
    // console.log($scope.previous);
    var dash_timeStamp = new Date().getTime();
    // console.log(new Date(dashBoard).getTime());
    // console.log(new Date(dash_timeStamp));

    // GET restService Call
    var getconfig={
        token: localStorageService.get('token'),
        timeStamp: dash_timeStamp
    };

    restService.getRequest('readDashboardData', getconfig)
    .then(function(data) {

      //AttendanceSummary Details
      // console.log(data.data);
      console.log(data.data.attendanceSummary);
      // $scope.dash_attendSum_marked = data.data.attendanceSummary.marked;
      // $scope.dash_attendSum_unmarked = data.data.attendanceSummary.unmarked;

      // AttendanceFallout Details
      // console.log(data.data.attendanceFallout);
      // $scope.dash_attendFallout_fEmp = data.data.attendanceFallout.falloutEmployee;
      // $scope.dash_attendFallout_tEmp = data.data.attendanceFallout.totalEmployee;

      // leaveSummary Details
      // console.log(data.data.leaveSummary);
      // $scope.dash_leaveSummary = data.data.leaveSummary.leave;
    })
};
