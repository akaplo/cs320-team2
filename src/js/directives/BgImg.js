app.directive("bgImg", function(){
	return function(scope, element, attrs){
		attrs.$observe("bgImg", function(imgPath){
			element.css({ "background-image": "url(" + imgPath + ")"});
		});
	}
});