// Engineer Card Display
angular.module("myApp")
    .directive('empCard', function() {
        return {
            scope: {
                engineers: "="
            },

            replace: true,

            templateUrl: 'template/engineersCard.html'
        };
    });
