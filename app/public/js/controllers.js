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
		$http.get("http://localhost:3000/get").success(function (dataMom) {
			$scope.momentsObjs = dataMom;
			mapObjectsCoor($scope.momentsObjs);
		});

		$scope.mapData = function (){
			$http.get('../json/map.json').then(function(data){
				$scope.mapStyle = data;
				initialize($scope.mapStyle.data);

			});		
		}

		function mapObjectsCoor(dataMom){
			var mapObjectsCoorStack = [];
			angular.forEach(dataMom, function(item1) {
				angular.forEach(item1.myMoments, function(item2) {
					if(angular.isDefined(item2.coor)){
						var obj = { lat: item2.coor[0].latitude , long: item2.coor[0].longitude, color: item2.color};
						mapObjectsCoorStack.push(obj);
					}
				});
			});
			$scope.singleMomentObj = mapObjectsCoorStack;

			  for (i = 0; i < $scope.singleMomentObj.length; i++){
     				   createMarker($scope.singleMomentObj[i]);
    }
		};	

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){
		var path = '../../images/pin';
		var pinColor = "";
		var icons = {
		  	red: {
				icon: path + 'Red.png'
			},
			green: {
				icon: path + 'Green.png'
			},
			blue: {
				icon: path + 'Blue.png'
			},
			orange: {
				icon: path + 'Orange.png'
			}
		};
	
		if(info.color == "red") {
			var pinColor = icons.red.icon;
		}
		else if(info.color == "green") {
			var pinColor = icons.green.icon;
		}
		else if(info.color == "blue") {
			var pinColor = icons.blue.icon;
		}
		else if(info.color == "orange") {
			var pinColor = icons.orange.icon;
		}

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
			icon: pinColor
        });
        marker.content = '<div class="infoWindowContent">' + '</div>';
        var blah = '<h2>' + "YOOO" + '</h2>';




     var blah = '<li class="momList"><div class="row-fluid headMsg" ><p class="col-xs-3 momDate pfont"></p><p class="col-xs-6 pfont"></p><p class="col-xs-3 momDistance pfont">1.2 km</p><div class="clear"></div><p class=" col-xs-12"></p></div><div class="row-fluid bodyMsg" ><p class="momMsg col-xs-12"><a href="#/moments/">hellooooooo how are you guysssss</a></p></div><div class="clear"></div><div class="row-fluid "><p class=" col-xs-12 tailBrdr"></p><p class="momExplores col-xs-8 pfont ">Remoments</p></div><div class="clear"></div></li>';











        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(blah);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

		function initialize(_data){
			var mapCanvas = document.getElementById('map-canvas');
			var mapOptions = {
				center: new google.maps.LatLng(32.0733636, 34.76631740000005),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: _data
			}
			$scope.map = new google.maps.Map(mapCanvas, mapOptions);
		}
	}
	]);