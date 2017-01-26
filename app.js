angular.module('myApp', ['ui.router', 'ngMaterial', 'satellizer', 'LocalStorageModule','xeditable'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {



        // skipIfLoggedIn
        var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];


        // loginRequired
        var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];


        /**
         * app routes
         **/
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'template/login.html',
                controller: 'loginCtrl',
                resolve: {
                   skipIfLoggedIn: skipIfLoggedIn
                 }
            })

            .state('home', {
                url: '/',
                templateUrl: 'template/home.html',
                controller: 'homeCtrl',
            })

            .state('home.dashboard', {
                    url: 'dashboard',
                    templateUrl: 'template/dashboard.html',
                    controller: 'dashCtrl',
                    resolve: {
                      loginRequired: loginRequired
                    }
              })

            .state('home.engineers', {
                url: 'engineers',
                templateUrl: 'template/engineers.html',
                controller: 'enginerCtrl',
                resolve: {
                  loginRequired: loginRequired
                }
            })

            .state('home.summary', {
                  url: 'engineers/summary/:engineerId',
                  templateUrl:'template/profile.html',
                  controller:'profileCtrl',
                  resolve: {
                    loginRequired: loginRequired
                  }
            })

            .state('home.summary.personal', {
              url: '/personal',
              templateUrl: 'template/personalEngg.html',
              controller: 'perEnggCtrl',
              resolve: {
                 loginRequired: loginRequired
              }
            })

            .state('home.summary.profile', {
              url: '/profile',
              templateUrl: 'template/profileEngg.html',
              controller: 'proEnggCtrl',
              resolve: {
                 loginRequired: loginRequired
              }
            })

            .state('home.summary.hrdata', {
              url: '/hrdata',
              templateUrl: 'template/hrDataEngg.html',
              controller: 'hrDataEnggCtrl',
              resolve: {
                 loginRequired: loginRequired
              }
            })

            .state('home.summary.bank', {
              url: '/bank',
              templateUrl: 'template/bankEngg.html',
              controller: 'bankEnggCtrl',
              resolve: {
                 loginRequired: loginRequired
              }
            })

            .state('home.summary.tracking', {
              url: '/tracking',
              templateUrl: 'template/trackingEngg.html',
              controller: 'trackingEnggCtrl',
              resolve: {
                 loginRequired: loginRequired
              }
            })

            .state('logout', {
                url: 'logout',
                template: null,
                controller: 'logoutCtrl'
            })
    }]);
