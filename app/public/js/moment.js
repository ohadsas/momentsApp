var momentApp = angular.module("momentApp",[]);//first of all we make the module
console.log("moment.js");

momentApp.controller('DataCtrl', function($scope,$http) {

	$http.get("http://localhost:3000/get").success(function (data) {
		console.log(data);
		$scope.user = data;
		console.log(" DataCtrl users data : " + data);
		$scope.moments = $scope.user;
	});

// $scope.allUsersMsgs = function(){
// 		$scope.usersStack = [];
// 		angular.forEach($scope.moments, function(item1) {
// 			angular.forEach(item1.myMoments, function(item2) {
// 				if(item1.userId){
// 				usersStack.push(item2.momMessage);
// 				}
// 			});
// 		});
// 	};

// $scope.displayMsg = function(){
// 		var stack = [];
// 		angular.forEach($scope.moments, function(item) {
// 			if(item.momMessage){
// 				stack.push(item.momMessage);
// 			}
// 		});
// 		return stack;
// 	};
});


momentApp.controller('MessageCtrl', function($scope,$http, $state) {
	$http.get("http://localhost:3000/get").success(function (data) {
		console.log(data);
		$scope.user = data;
		console.log("MessageCtrl users data : " + data);
		$scope.message = $scope.user;
	});

	$scope.checkMomMsgId = function(id) {
        console.log("id = " + id);
        $scope.momId = $scope.message.momMessage[id]; 
    };
 
});
