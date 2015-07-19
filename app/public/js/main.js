function removeNavBar() {
	if ( window.location.hash === "#/welcome"){
		 $('#navbar').css('display','none');
	}
}

function currentWindow() {
  $('.navIcon').each(function() {
    if (($(this).attr('href')  !==  window.location.hash) && ($(this).parent().attr("id") != "navLogo")){
      $(this).parent().addClass('notCurrent');
    }
  });
};  





