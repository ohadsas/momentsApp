var momentControllers = angular.module('momentControllers', []);

momentControllers.controller('MomentsListCtrl', ['$scope', '$http',
  function ($scope, $http) {
   $http.get("http://localhost:3000/get").success(function (data) {
		$scope.momentsObjs = data;
		console.log(" MomentsListCtrl data : " + data);
		$scope.moments = $scope.momentsObjs;
	});
  }]);

momentControllers.controller('SingleMomentCtrl', ['$scope', '$routeParams', '$http',
	 function ($scope, $routeParams, $http) {
	 	$http.get("http://localhost:3000/get").success(function (data) {
	 	$scope.momentsObjs = data;
		console.log("SingleMomentCtrl : " + data);
       $scope.momId = $routeParams.momId;
       $scope.moments = $scope.momentsObjs;
});
       
 $scope.singleMmomentObjId = function(){
		 var singleMomentStack = [];
		angular.forEach($scope.moments, function(item1) {
			angular.forEach(item1.myMoments, function(item2) {
				if(item2.momId == $scope.momId){
				singleMomentStack.push(item2);
				}
			});
		});
	return $scope.singleMomentObj = singleMomentStack;

	};
}]);

