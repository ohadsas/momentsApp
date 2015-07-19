var momentControllers = angular.module('momentControllers', []);

/*=============================================MOMENTS-LIST CTRL============================================*/

momentControllers.controller('MomentsListCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.get("http://localhost:3000/get").success(function (data) {
			$scope.momentsObjs = data;
			$scope.moments = $scope.momentsObjs;
		});


		$scope.momentBodyColor = function(itemColor){
			if(angular.isDefined(itemColor)){
				if(itemColor == "red"){
					$scope.bodyStyle = {
						"background-color" : "rgba(235,102,90,0.8)",
						"border-color": "rgb(193,83,74)",
						"box-shadow": "0 0 2px 0 rgb(193,83,74)"
					};
				}
				else if(itemColor == "orange"){
					$scope.bodyStyle = {
						"background-color" : "rgba(245,182,113,0.8)",
						"border-color": "rgb(208,155,97)",
						"box-shadow": "0 0 2px 0 rgb( 208,155,97)"
					};
				}
				else if(itemColor == "blue"){
					$scope.bodyStyle = {
						"background-color" : "rgba(117,194,173,0.8)",
						"border-color": "rgb(9,87,79)",
						"box-shadow": " 0 0 2px 0 rgb( 9,87,79)"
					};
				}
				else if(itemColor == "green"){
					$scope.bodyStyle = {
						"background-color" : "rgba(214,214,118,0.8)",
						"border-color": "rgb(166,168,93)",
						"box-shadow": "0 0 2px 0 rgb(166,168,93)"
					};
				}
				return $scope.bodyStyle;
			}
		};
		$scope.momentHeadColor = function(itemColor){
			if(angular.isDefined(itemColor)){
				if(itemColor == "red"){
					$scope.headStyle = {
						"background-color" : "#Ef502F",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(193,83,74)"
					};
				}
				else if(itemColor == "orange"){
					$scope.headStyle = {
						"background-color" : "#EDC44a",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(208,155,97)"
					};
				}
				else if(itemColor == "blue"){
					$scope.headStyle = {
						"background-color" : "#16A79A",
						"box-shadow": "0.5px 0.9px 2px 0 rgb(9,87,79)"
					};
				}
				else if(itemColor == "green"){
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
			$scope.momId = angular.isDefined($routeParams.momId) ? $routeParams.momId : $routeParams._id;  ;
			$scope.moments = $scope.momentsObjs;
		});

		$scope.singleMmomentObjId = function(){
			var singleMomentStack = [];
			angular.forEach($scope.moments, function(item1) {
				angular.forEach(item1.myMoments, function(item2) {
					if((item2.momId == $scope.momId) ||(item2._id == $scope.momId)){
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

//  var remMsg = $('.remMsg').on('load', $scope.confirmDir);


// $scope.confirmDir = function(remMsg){
// $scope.letter = (remMsg.slice(0,1));
// debugger;

// if(angular.isDefined($scope.letter) && $scope.letter != null && $scope.letter.length > 0){
//         var isRTL = $scope.checkRTL(String.fromCharCode($scope.letter.charCodeAt(0)));
//         var dir = isRTL ? 'RTL' : 'LTR';
//      	remMsg.style.direction = dir;    
// 	}
// }
// 	debugger;


// $scope.checkRTL = function(letter){
// 	debugger;
// 	if(angular.isDefined(letter) && letter != null && letter.length > 0){

//     var ltrChars    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
//     var  rtlChars    = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
//     var rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');
//     return rtlDirCheck.test(letter);

// }}
}]);

/*=============================================AUTH CTRL============================================*/

momentControllers.controller('AuthMomentCtrl', ['$scope', '$routeParams', '$http','$window', 'IdentityService',
	function ($scope, $routeParams, $http, $window ,IdentityService) {
		$scope.login = function(){
			$http({
				method: 'POST',
				url: 'http://localhost:3000/login',
				data: {'email': $scope.email, 'password' : $scope.password },
				headers: {'Content-Type': 'application/json'}
			}).then(function(response,headers) {
				console.log("yesss");

				IdentityService.savedLoginUser(response.data);

				$window.location='/#/map';
			}, 
	    function(response,headers) { // optional
	    	$scope.wrongCred = true;
	       console.log("NOOOOOO");     // failed
	   });
		};
	}]
	);


/*=============================================MAP CTRL============================================*/
momentControllers.controller('MapCtrl', ['$scope', '$routeParams', '$http', 'geolocation', 'IdentityService','momentService',
	function ($scope, $routeParams, $http, geolocation, IdentityService, momentService) {
		$http.get("http://localhost:3000/get").success(function (dataMom) {
			$scope.momentsObjs = dataMom;
		});

		$scope.mapData = function (){
			$http.get('../json/map.json').then(function(data){
				$scope.mapStyle = data;
				geolocation.getLocation().then(function(result){
					$scope.coords = {latitude:result.coords.latitude, longitude:result.coords.longitude};
					initialize($scope.mapStyle.data, $scope.coords);
					mapObjectsCoor($scope.momentsObjs);

				});

			});		
		}
			// $scope.coords = {
	  // 		latitude: 32.074611, 
	  // 		longitude: 34.777372	
	  // 	}



		$scope.color= "blue"; //default
		$scope.createMoment = function (){
			momentService.createMoment(IdentityService.LoggedInUser.email, $scope.coords, $scope.message, $scope.color)
			.then(function(result){

			});
		}

// $scope.center = function( obj){
// 	debugger;
//     obj.css("position","fixed");
//     obj.css("top", Math.max(0, (($(window).height() - $(obj).outerHeight()) / 2) + 
//         $(window).scrollTop()) + "px");
//     obj.css("left", Math.max(0, (($(window).width() - $(obj).outerWidth()) / 2) + 
//         $(window).scrollLeft()) + "px");
//     return obj;
// };

		function mapObjectsCoor(dataMom){
			var mapMomObjectsStack = [];
			var mapObjectsCoorStack = [];
			angular.forEach(dataMom, function(item1) {
				angular.forEach(item1.myMoments, function(item2) {
					if(angular.isDefined(item2.coor)){
						var objCoor = { latitude: item2.coor[0].latitude , longitude: item2.coor[0].longitude, color: item2.color};
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
			shadowStyle: 0,
			padding: 0,
			backgroundColor: 'transparent',
			borderRadius: 5,
			arrowSize: 0,
			borderWidth: 1,
			borderColor: 'transparent',
			disableAutoPan: true,
			backgroundClassName: 'bubbleBody'
		});


		var createMarker = function (info , obj){

			$scope.momObj = obj;
			$scope.momBodyColor = "";
			$scope.momHeadColor = "";
			$scope.fontColor = "";
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
				$scope.momBodyColor = 'background-color : rgba(235,102,90,0.8); ' +
				'border-color: rgb(193,83,74); '+
				'box-shadow: 0 0 1px 0 #faf6e2;'+
				'border-radius-top-left:4px;'+ 'border-radius-bottom-right: 4px;';
				$scope.momHeadColor = 'background-color : #Ef502F;' +
				'box-shadow: 0.5px 0.9px 2px 0.5px rgb(193,83,74);';
				$scope.fontColor = 'color: rgba(235,102,90,0.8);';
			}
			else if(info.color == "green") {
				var pinColor = icons.green.icon;
				$scope.momBodyColor = '	background-color : rgba(214,214,118,0.8);' +
				'border-color: rgb(166,168,93);' +
				'box-shadow: 0 0 1px 0 #faf6e2;'+
				'border-radius-top-left:4px;'+ 'border-radius-bottom-right: 4px;';
				$scope.momHeadColor = 'background-color : #ABCB64;' +
				'box-shadow: 0.5px 0.9px 2px 0.5px rgb(166,168,93);';
				$scope.fontColor = 'color: rgba(214,214,118,0.8);';

			}
			else if(info.color == "blue") {
				var pinColor = icons.blue.icon;
				$scope.momBodyColor = 'background-color : rgba(117,194,173,0.8); '+
				'border-color: rgb(9,87,79); '+
				'box-shadow: 0 0 1px 0 #faf6e2;'+
				'border-radius-top-left:4px;'+ 'border-radius-bottom-right: 4px;';
				$scope.momHeadColor = 'background-color : #16A79A; '+
				'box-shadow: 0.5px 0.9px 2px 0.5px rgb(9,87,79);';
				$scope.fontColor = 'color: rgba(117,194,173,0.8);';

			}
			else if(info.color == "orange") {
				var pinColor = icons.orange.icon;
				$scope.momBodyColor = 	'background-color : rgba(245,182,113,0.8);' +
				'border-color:  0 0 1px 0 #faf6e2;' +
				'box-shadow: 0 0 2px 0 rgb( 208,155,97);' +
				'border-radius-top-left:4px;'+ 'border-radius-bottom-right: 4px;';
				$scope.momHeadColor = 'background-color : #EDC44a; '+
				'box-shadow: 0.5px 0.9px 2px 0.5px rgb(208,155,97);';
				$scope.fontColor = 'color: rgba(245,182,113,0.8);';

			}

			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(info.latitude, info.longitude),
				icon: pinColor,
				info: info,
				content: $scope.momObj,
				head: $scope.momHeadColor,
				body: $scope.momBodyColor,
				font: $scope.fontColor
			});

			$scope.markers.push(marker);


			var tags1 = '<div class="panel panel-default" ng-controller="MomentsListCtrl" ><div class="panel-heading panelHeadTakeMe panel-font" style =" ';
			var tags11 = '">';
			var tags2 = '</div><div class="panel-body panelBodyTakeMe" style =" ';
			var tags22 = '"><p>';
			var tags3 = '</p><a class=" panelBtntakeMe" role="button" href="#/moments/'
			var tags4 ='"style=" '
			var tags444 = '">Take me</a></div><div class= "class="panel-footer panelFooterTakeMe panel-font " style=" ';
			var tags44 = '<div class= "bodyPanelCnt " style =" ';
			var tags5= '</div></div>';


			google.maps.event.addListener(marker, 'click', function(){

				infoBubble.setContent( tags1  + marker.head + tags11 + marker.content.address + tags2 + marker.body +' '
					+ tags22 + marker.content.momMessage + tags3 + (marker.content.momId || marker.content._id) + tags4 + marker.font + tags444 + marker.body + tags11 +
					'&nbsp' +	marker.content.explores + ' Explores' + ' ' + marker.content.remoments.length + ' Remoments' + tags5); 
				infoBubble.open($scope.map, marker);
				// $scope.center('.bubbleBody');
			});


			google.maps.event.addListener($scope.map, 'click', function(){
				
				infoBubble.close();
				delete infoBubble;
				infoBubble = new InfoBubble({
				  shadowStyle: 0,
				  padding: 0,
				  backgroundColor: 'transparent',
				  borderRadius: 5,
				  arrowSize: 0,
				  borderWidth: 1,
				  borderColor: 'transparent',
				  disableAutoPan: true,
				  hideCloseButton: true,
				  disableAutoPan: true,
				  backgroundClassName: 'bubbleBody'
				});
				infoBubble.setContent( tags1  + marker.head + tags11 + marker.content.address + tags2 + marker.body +' '
					+ tags22 + marker.content.momMessage + tags3 + (marker.content.momId || marker.content._id) + tags4 + marker.font  + tags444 + marker.body + tags11 +
					'&nbsp' + marker.content.explores + ' Explores' + ' ' + marker.content.remoments.length + ' Remoments' + tags5);        
			});

		}  

		function initialize(_data, center){
			var mapCanvas = document.getElementById('map-canvas');
			var mapOptions = {
				center: new google.maps.LatLng(center.latitude, center.longitude),
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: _data
			}
			$scope.map = new google.maps.Map(mapCanvas, mapOptions);

			// debugger;
			// $( document ).ready(function() {
			// 	
			// });

		}
	}
	]);