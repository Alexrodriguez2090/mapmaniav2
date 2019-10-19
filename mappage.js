var map;
var findMe = {lat:-36.84,lng:174.7};

// Initialization of map
function initMap() {
	console.log("Welcome to my game, the objective is to find a specific place on the map")
	var myLocation = {
	center: new google.maps.LatLng(41.60,-88.07),
	zoom: 10
	};

	map = new google.maps.Map(document.getElementById('mapdiv'),myLocation)
	//Reports zoom whenever it changes
	map.addListener('zoom_changed', function() {
		var zoom = map.getZoom()
		console.log('Zoom: '+zoom);
	});
	//Reports bounds whenever they change
	map.addListener('bounds_changed', function() {
		var bounds = map.getBounds()
		console.log("Bounds: "+bounds);
		doYouSeeIt()
	});
	//Adds a hint window
	var infoWindow = new google.maps.InfoWindow({
		content: "Hint: Duckland but it starts with an A instead of a D",
		position: new google.maps.LatLng(41.60,-88.07)
	});
	infoWindow.open(map);

}

// Checks if you see the bounds
function doYouSeeIt() {
	var bounds = map.getBounds();
	var zoom = map.getZoom();
	// Will repeat this message if you see Auckland but are not zoomed in enough
	if (bounds.contains(findMe) && zoom < 8) {
		console.log("---------It is in view---------");
		console.log("--------------but--------------");
		console.log("-------you gotta zoom in-------");
	};
	// Will repeat this message if you see Auckland and are zoomed in enough
	if (bounds.contains(findMe) && zoom >= 8) {
		console.log("*******************************");
		console.log("---------You found it!---------");
		console.log("*******************************");
		var marker = new google.maps.Marker({position: findMe, map: map});
	};
}