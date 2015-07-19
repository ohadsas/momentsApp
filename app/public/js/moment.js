var momentApp = angular.module("momentApp",['ngRoute','momentControllers','ngTouch','geolocation','angularReverseGeocode']);//first of all we make the module
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
        controller: 'MapCtrl'
      }).
      otherwise({
        redirectTo: '/moments'
      });
	}]);

momentApp.factory('IdentityService', function(){
  var IdentityService = {};
  IdentityService.LoggedInUser = {};


  IdentityService.savedLoginUser = function(user){
    IdentityService.LoggedInUser = user;
  }
    return IdentityService;
});

momentApp.factory('momentService',['$http',function($http){
  var momentService = {};
  momentService.createMoment = function(userId, coor, message, color) {
    return $http({
          method: 'POST',
          url: 'http://localhost:3000/createmoment',
          data: {'userId': userId, 'coor': coor, 'message': message, 'color': color},
          headers: {'Content-Type': 'application/json'}
      });
  };
return momentService;
}]);
