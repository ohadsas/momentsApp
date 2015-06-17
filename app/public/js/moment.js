var momentApp = angular.module("momentApp",['ngRoute','momentControllers']);//first of all we make the module
console.log("moment.js");

momentApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/moments', {
        templateUrl: 'partials/moments-list.html',
        controller: 'MomentsListCtrl'
      }).
      when('/moments/:momId', {
        templateUrl: 'partials/single-moment.html',
        controller: 'SingleMomentCtrl'
      }).
      otherwise({
        redirectTo: '/moments'
      });
  }]);

