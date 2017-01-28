/**
 *@file app.js
 *@author vikash kumar prasad
 *@define module
 *@param {string} myApp - parameter refers to the HTML element in which app will return
 *@param {array} injector - loading module though injector
 */

angular.module('myApp', ['ui.router', 'ngMaterial', 'satellizer', 'LocalStorageModule', 'xeditable'])

    /**
     *configuring  exisiting services
     *self invoking function
     */
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


        /**
         *@method skipIfLoggedIn - skipping if already loggedin
         *@param {array} injector - loading modules through injector
         *@param {service} $q - promise
         *@param {service} $auth - satellizer service
         */
        var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];


        /**
         *@method loginRequired - login required
         *@param {array} injector - loading modules through injector
         *@param {service} $q - promise
         *@param {service} $auth - satellizer service
         *@param {service} $location - url path
         */
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
         *@default dashboard
         **/
        $urlRouterProvider.otherwise('/dashboard');

        /**@define states*/
        $stateProvider

            /**login state*/
            .state('login', {
                url: '/login',
                templateUrl: 'template/login.html',
                controller: 'loginCtrl',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })

            /**home state*/
            .state('home', {
                url: '/',
                templateUrl: 'template/home.html',
                controller: 'homeCtrl',
            })

            /**home nested state*/
            /**dashboard state*/
            .state('home.dashboard', {
                url: 'dashboard',
                templateUrl: 'template/dashboard.html',
                controller: 'dashCtrl',
                resolve: {
                    loginRequired: loginRequired  // loginRequired function will check for token.
                }
            })

            /**engineers state*/
            .state('home.engineers', {
                url: 'engineers',
                templateUrl: 'template/engineers.html',
                controller: 'enginerCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**profile state*/
            .state('home.summary', {
                url: 'summary/:engineerId',
                templateUrl: 'template/profile.html',
                controller: 'profileCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**profile nested state*/
            /**personal state*/
            .state('home.summary.personal', {
                url: '/personal',
                templateUrl: 'template/personalEngg.html',
                controller: 'perEnggCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**profile state*/
            .state('home.summary.profile', {
                url: '/profile',
                templateUrl: 'template/profileEngg.html',
                controller: 'proEnggCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**hrdata state*/
            .state('home.summary.hrdata', {
                url: '/hrdata',
                templateUrl: 'template/hrDataEngg.html',
                controller: 'hrDataEnggCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**bank state*/
            .state('home.summary.bank', {
                url: '/bank',
                templateUrl: 'template/bankEngg.html',
                controller: 'bankEnggCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**tracking state*/
            .state('home.summary.tracking', {
                url: '/tracking',
                templateUrl: 'template/trackingEngg.html',
                controller: 'trackingEnggCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })

            /**logout state*/
            .state('logout', {
                url: 'logout',
                template: null,
                controller: 'logoutCtrl'
            })
    }]);
