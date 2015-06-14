var momentApp = angular.module("momentApp",[]);//first of all we make the module
console.log("moment.js");

momentApp.controller('DataCtrl', function($scope,$http) {

	$http.get("http://localhost:3000/get").success(function (data) {
		console.log(data);
		$scope.user = data;
		console.log("users data : " + data);
		debugger;
		$scope.moments = $scope.user;
	});

$scope.allUsers = function(){
		var usersStack = [];
		angular.forEach($scope.moments, function(item1) {
			angular.forEach(item1.myMoments, function(item2) {
				if(item1.userId){
				usersStack.push(item2.momMessage);
				
				}

			});

		});

					return usersStack;
	};

$scope.displayMsg = function(){
		var stack = [];
		angular.forEach($scope.moments, function(item) {
			if(item.momMessage){
				stack.push(item.momMessage);
			}
		});
		return stack;
	};


});


