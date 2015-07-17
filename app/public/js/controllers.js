var momentControllers = angular.module('momentControllers', []);

/*=============================================MOMENTS-LIST CTRL============================================*/

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
/*=============================================SINGLE-MOMENT CTRL=======================================*/

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

/*=============================================AUTH CTRL============================================*/
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

/*=============================================MAP CTRL============================================*/
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
			var mapMomObjectsStack = [];
			var mapObjectsCoorStack = [];
			angular.forEach(dataMom, function(item1) {
				angular.forEach(item1.myMoments, function(item2) {
					if(angular.isDefined(item2.coor)){
						var objCoor = { lat: item2.coor[0].latitude , long: item2.coor[0].longitude, color: item2.color};
						mapObjectsCoorStack.push(objCoor);
						mapMomObjectsStack.push(item2);
					}
				});
			});
			$scope.mapObjectsCoor = mapObjectsCoorStack;
			$scope.mapMomObjects = mapMomObjectsStack;
			if($scope.mapMomObjects != null){
				for (i = 0; i < $scope.mapObjectsCoor.length; i++){
     				   createMarker($scope.mapObjectsCoor[i],$scope.mapMomObjects[i]);
			}	  
    }
        
		};	

    $scope.markers = [];

 infoBubble = new InfoBubble({
	  position: new google.maps.LatLng(-32.0, 149.0),
      shadowStyle: 0,
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 5,
      arrowSize: 0,
      borderWidth: 1,
      borderColor: 'transparent',
      disableAutoPan: true,
      hideCloseButton: true,
      backgroundClassName: 'bubbleBody'
    });


    var createMarker = function (info , obj){

    	 $scope.momObj = obj.address;
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
			icon: pinColor, 
			content: $scope.momObj
        });

        $scope.markers.push(marker);

        google.maps.event.addListener(marker, 'click', function(){
        		infoBubble.setContent( '<h2>' + marker.content + '</h2>');
        	    infoBubble.open($scope.map, marker);
        });

           google.maps.event.addListener($scope.map, 'click', function(){
        	    infoBubble.close();
        	    delete infoBubble;
        	    infoBubble = new InfoBubble({
				  position: new google.maps.LatLng(-32.0, 149.0),
			      shadowStyle: 0,
			      padding: 0,
			      backgroundColor: 'transparent',
			      borderRadius: 5,
			      arrowSize: 0,
			      borderWidth: 1,
			      borderColor: 'transparent',
			      disableAutoPan: true,
			      hideCloseButton: true,
			      backgroundClassName: 'bubbleBody'
			    });
			    infoBubble.setContent( '<h2>' + marker.content + '</h2>');


        });
        
    }  

		function initialize(_data){
			var mapCanvas = document.getElementById('map-canvas');
			var mapOptions = {
				center: new google.maps.LatLng(32.074611, 34.777372),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: _data
			}

			$scope.map = new google.maps.Map(mapCanvas, mapOptions);
		}
	}
	]);