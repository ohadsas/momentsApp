function removeNavBar() {
	if ( window.location.hash === "#/welcome"){
		 $('#navbar').css('display','none');
	}
}

function currentWindow() {
  $('.nav a').each(function() {
    if (($(this).attr('href')  !==  window.location.hash) && ($(this).parent().attr("id") != "navLogo")){
      $(this).parent().addClass('notCurrent');
    }
  });
};  

// var json = (function () {
//     var json = null;
//     $.ajax({
//         'async': true,
//         'global': false,
//         'url': '../json/map.json',
//         'dataType': "json",
//         'success': function (data) {
//             json = data;
//         }
//     });
//     return json;
// })(); 

var my_json;
$.getJSON('../json/map.json', function(json) {
  my_json = json;
});
 function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
		center: new google.maps.LatLng(32.0733636, 34.76631740000005),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: my_json
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
}