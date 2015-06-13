var momentApp = angular.module("momentApp",[]);//first of all we make the module
console.log("moment.js");

var model = {
	user:"Ohad"
};

momentApp.run(function ($http){ //like onload gets $http service
	$http.get("http://localhost:3000/ws_todo/getActionsData").success(function (data){
		console.log(data);
		model.items = data;
	});
});

momentApp.filter("checkedItems", function(){
	return function(items, showComplete){
		var resultArr = [];
		angular.forEach(items,function(item){
			if(item.done == false || showComplete == true){
				resultArr.push(item);
			};
		});
		return resultArr;
	};
});

momentApp.controller('MomentsCtrl', function($scope){
	$scope.todo = model;
	$scope.incompleteCount = function(){
		var count = 0;
		angular.forEach($scope.todo.items, function(item) {
			if(!item.done){count++;}
		});
		return count;
	};
	$scope.warningLevel = function(){
		return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
	};
	$scope.addNewItem = function (actionText){
		$scope.todo.items.push({action: actionText, done: false});
	};
});

