/**
 *dashboard controller
 *@define controller
 *@param {string} dashCtrl - controller refer to the controller used by HTML element
 */
angular.module('myApp')
    .controller('dashCtrl', dashBoard);

/**
 *@method dashBoard - function for dashboard details
 *@param {function} selfInvoked - dependencies added
 */
function dashBoard($scope, $http, localStorageService, restService) {
    console.log("dashBoardCtrl is Calling..");

    // Current Date object
    $scope.date = new Date();

    // Previous Date object
    var dashBoard = new Date();
    $scope.previous = dashBoard.setDate(dashBoard.getDate() - 1);

    var dash_timeStamp = new Date().getTime();

    /**getconfig json*/
    var getconfig = {
        // token: localStorageService.get('token'),
        timeStamp: dash_timeStamp
    };

    /**restservice use to get  readDashboardData*/
    restService.getRequest('readDashboardData', getconfig)
        .then(function(data) {
            // console.log(data.data.attendanceSummary);
        })
};
