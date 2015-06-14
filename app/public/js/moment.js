var momentApp = angular.module("momentApp",[]);//first of all we make the module
console.log("moment.js");

momentApp.controller('MomentsCtrl', function($scope,$http) {
	
	$http.get("http://localhost:3000/get").success(function (data) {
		console.log(data);
		$scope.user = data;
		debugger;
		console.log("user id gdfgdfgdfg : "+ user);
	});

});


