var map;
var findMe = [
    {"content":"You win!", "hint":"You win!", "score":"80", "coordinates":{"lat":34.0522,"lng":-118.2437}},
    {"content":"Auckland, New Zealand", "hint":"That one country by Australia", "score":"70", "coordinates":{"lat":-36.8485,"lng":174.7633}},
    {"content":"Caguas, Puerto Rico", "hint":"My birthplace in the caribbean", "score":"60", "coordinates":{"lat":18.2341,"lng":-66.0485}},
    {"content":"Orlando, Florida", "hint":"Universal Studios", "score":"50", "coordinates":{"lat":28.4790,"lng":-81.4685}},
    {"content":"Seattle, Washington", "hint":"Always cloudy and full of hipster bands", "score":"40", "coordinates":{"lat":47.6062,"lng":-122.3321}},
    {"content":"Tokyo, Japan", "hint":"Sushi, technology, animation", "score":"30", "coordinates":{"lat":35.6762,"lng":139.6503}},
    {"content":"Springfield, Illinois", "hint":"Our capital", "score":"20", "coordinates":{"lat":39.7817,"lng":-89.6501}},
    {"content":"Los Angeles, California", "hint":"It's the city of Angels", "score":"10", "coordinates":{"lat":34.0522,"lng":-118.2437}},
    {"content":"Louisville, Kentucky", "hint":"________ Fried Chicken", "score":"0", "coordinates":{"lat":38.2527,"lng":-85.7585}},
];

var currentPlaceIndex = 8
var currentPlace = findMe[currentPlaceIndex];

// Initialization of map
function initMap() {
	console.log("Welcome to my game, the objective is to find a specific place on the map")
	var myLocation = {
	center: new google.maps.LatLng(41.60,-88.07),
	zoom: 10
	};

	map = new google.maps.Map(document.getElementById('mapdiv'),myLocation);
	//Reports zoom to log and box whenever it changes
	map.addListener('zoom_changed', function() {
		var zoom = map.getZoom();
		console.log('Zoom: '+zoom);
		document.getElementById("zoomid").innerHTML = zoom;
	});
	//Reports bounds whenever they change and checks if you see the right bounds with below function
	map.addListener('idle', function() {
		var bounds = map.getBounds();
		console.log("Bounds: "+bounds);
		document.getElementById("hintid").innerHTML = currentPlace.hint + "<div id='closerid'></div>";
		doYouSeeIt()
	});
}

// Checks if you see the bounds
function doYouSeeIt() {
	if (currentPlace.score == 80) {
		document.getElementById("scoreid").innerHTML = currentPlace.score;
		return;
	}
	//Zoom out bounds
	var america = {
	center: new google.maps.LatLng(41.60,-88.07),
	zoom: 4
	};

	var bounds = map.getBounds();
	var zoom = map.getZoom();
	document.getElementById("scoreid").innerHTML = currentPlace.score;

	// Will repeat this message if you see the right bounds but are not zoomed in enough
	if (bounds.contains(currentPlace.coordinates) && zoom < 8) {
		console.log("---------It is in view---------");
		console.log("--------------but--------------");
		console.log("-------you gotta zoom in-------");
		document.getElementById("closerid").innerHTML = "<hr />---------It is in view---------<br />**************but**************<br />-------you gotta zoom in-------";
	}
	// Will tell you if you've found it, set new coords, add a marker, and zoom you back out
	else if (bounds.contains(currentPlace.coordinates) && zoom >= 8) {
		console.log("*******************************");
		console.log("---------You found it!---------");
		console.log("*******************************");
		var marker = new google.maps.Marker({position: currentPlace.coordinates, map: map});
		map.panTo(currentPlace.coordinates)
		map.setOptions({draggable: false});
		map.zoomControl = false;
		currentPlaceIndex = currentPlaceIndex - 1;
		currentPlace = findMe[currentPlaceIndex];
		window.setTimeout(function() {
			map.setZoom(4);
			map.panTo(america.center, map);
			map.setOptions({draggable: true})
    	}, 4000);
    	window.setTimeout(function() {
			document.getElementById("closerid").innerHTML = "<hr />*******************************<br />---------You found it!---------<br />*******************************";
		}, 500);
		if (currentPlace.score == 80) {
			window.setTimeout(function() {
				document.getElementById("closerid").innerHTML = '<iframe width="350" height="107" src="https://www.youtube.com/embed/1Bix44C1EzY?autoplay=1"></iframe>';
			}, 4100);
		}
	}
	// Message for if bounds are not in range
	else {
		console.log("-----------It is not-----------");
		console.log("------------in view------------");
		console.log("----------check above----------");
		document.getElementById("closerid").innerHTML = "<hr />-----------It is not-----------<br />------------in view------------<br />-------check hints above-------";
	};
}