var momentApp = angular.module("momentApp",['ngRoute','momentControllers','ngTouch']);//first of all we make the module
console.log("moment.js");

momentApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/moments', {
        templateUrl: 'views/partials/moments-list.html',
        controller: 'MomentsListCtrl'
      }).
        when('/welcome', {
        templateUrl: 'views/partials/welcome-page.html',
        controller: 'MomentsListCtrl'
      }).
        when('/login', {
        templateUrl: 'views/partials/login.html',
        controller: 'AuthMomentCtrl'
      }).
      when('/moments/:momId', {
        templateUrl: 'views/partials/single-moment.html',
        controller: 'SingleMomentCtrl'
      }).
      when('/map', {
        templateUrl: 'views/partials/map.html',
        controller: 'SingleMomentCtrl'
      }).
      otherwise({
        redirectTo: '/moments'
      });
	}]);

