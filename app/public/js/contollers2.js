var momentControllers = angular.module('momentControllers', []);
momentControllers.controller('MomentsListCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.get("http://localhost:3000/get").success(function (data) {
			$scope.momentsObjs = data;
			$scope.moments = $scope.momentsObjs;
		});
		$scope.momentBodyColor = function(item){
			if(angular.isDefined(item)){
				if(item.color == "red"){
					$scope.bodyStyle = {
						"background-color" : "rgba(235,102,90,0.8)",
						"border-color": "rgb(193,83,74)",
						"box-shadow": "0 0 2px 0 rgb(193,83,74)"
					};
				}
				else if(item.color == "orange"){
					$scope.bodyStyle = {
						"background-color" : "rgba(245,182,113,0.8)",
						"border-color": "rgb(208,155,97)",
						"box-shadow": "0 0 2px 0 rgb( 208,155,97)"
					};
				}
				else if(item.color == "blue"){
					$scope.bodyStyle = {
						"background-color" : "rgba(117,194,173,0.8)",
						"border-color": "rgb(9,87,79)",
						"box-shadow": " 0 0 2px 0 rgb( 9,87,79)"
					};
				}
				else if(item.color == "green"){
					$scope.bodyStyle = {
						"background-color" : "rgba(214,214,118,0.8)",
						"border-color": "rgb(166,168,93)",
						"box-shadow": "0 0 2px 0 rgb(166,168,93)"
					};
				}
				return $scope.bodyStyle;
			}
		};
		$scope.momentHeadColor = function(item){
			if(angular.isDefined(item)){
				if(item.color == "red"){
					$scope.headStyle = {
						"background-color" : "#Ef502F",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(193,83,74)"
					};
				}
				else if(item.color == "orange"){
					$scope.headStyle = {
						"background-color" : "#EDC44a",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(208,155,97)"
					};
				}
				else if(item.color == "blue"){
					$scope.headStyle = {
						"background-color" : "#16A79A",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(9,87,79)"
					};
				}
				else if(item.color == "green"){
					$scope.headStyle = {
						"background-color" : "#ABCB64",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(166,168,93)"
					};
				}
				return $scope.headStyle;
			};
		}	
	}]);

momentControllers.controller('SingleMomentCtrl', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {
		$http.get("http://localhost:3000/get").success(function (data) {
			$scope.momentsObjs = data;
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
		$scope.getRandomColor = function(item){
			if(item.colorSign){
				return item.colorSign;
			}
			var letters = '0123456789ABCDEF'.split('');
			var colorSign = '#';
			for (var i = 0; i < 6 ; i++ ) {
				colorSign += letters[Math.floor(Math.random() * 16)];        		
			}
			item.colorSign = colorSign;
			return colorSign;	
		};

	}]);

momentControllers.controller('AuthMomentCtrl', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {
		$scope.login = function(){
			$http({
				method: 'POST',
				url: 'http://localhost:3000/login',
				data: {'email': $scope.email, 'password' : $scope.password },
				headers: {'Content-Type': 'application/json'}
			}).then(function(response,headers) {
	            // success
	            console.log("Login Succeed");
	        }, 
	    function(response,headers) { // optional

	       console.log("Login Failed");     // failed
	   });

		};

	}]
	);




momentControllers.controller('MapCtrl', ['$scope', '$routeParams', '$http',
	function ($scope, $routeParams, $http) {
		$http.get("http://localhost:3000/get").success(function (data) {
			$scope.momentsObjs = data;
		});
		$http.get('../json/map.json').success (function(data){
				$scope.mapStyle = data;
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

		 $scope.initialize = function() {
		 	debugger;
		        var mapCanvas = document.getElementById('map-canvas');
		        var mapOptions = {
				center: new google.maps.LatLng(32.0733636, 34.76631740000005),
		          zoom: 15,
		          mapTypeId: google.maps.MapTypeId.ROADMAP,
		          styles: $scope.mapStyle
		        }
		        var map = new google.maps.Map(mapCanvas, mapOptions);
		}

	}
]);