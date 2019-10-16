var map;
var findMe = [
    {"content":"Auckland, New Zealand", "coordinates":{"lat":-36.8485,"lng":174.7633}, "iconImagePath":"one.png"},
    {"content":"Caguas, Puerto Rico", "coordinates":{"lat":18.2341,"lng":-66.0485}, "iconImagePath":"two.png"},
    {"content":"Orlando, Florida", "coordinates":{"lat":28.4790,"lng":-81.4685}, "iconImagePath":"flag.png"},
    {"content":"Seattle, Washington", "coordinates":{"lat":47.6062,"lng":-122.3321}, "iconImagePath":"flag.png"},
    {"content":"Tokyo, Japan", "coordinates":{"lat":35.6762,"lng":139.6503}, "iconImagePath":"flag.png"},
    {"content":"Los Angeles, California", "coordinates":{"lat":34.0522,"lng":-118.2437}, "iconImagePath":"flag.png"},
    {"content":"Nelson, New Zealand", "coordinates":{"lat":-41.2706,"lng":173.2840}, "iconImagePath":"flag.png"},
    {"content":"Krakow, Poland", "coordinates":{"lat":50.0647,"lng":19.9450}, "iconImagePath":"flag.png"},
];

var currentPlaceIndex = 7
var currentPlace = findMe[currentPlaceIndex];

// Initialization of map
function initMap() {
	console.log("Welcome to my game, the objective is to find a specific place on the map")
	var myLocation = {
	center: new google.maps.LatLng(41.60,-88.07),
	zoom: 10
	};

	map = new google.maps.Map(document.getElementById('mapdiv'),myLocation);
	//Reports zoom whenever it changes
	map.addListener('zoom_changed', function() {
		var zoom = map.getZoom();
		console.log('Zoom: '+zoom);
		document.getElementById("Hint").value = currentPlaceIndex;
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
	if (bounds.contains(currentPlace.coordinates) && zoom < 8) {
		console.log("---------It is in view---------");
		console.log("--------------but--------------");
		console.log("-------you gotta zoom in-------");
	};
	// Will repeat this message if you see Auckland and are zoomed in enough
	if (bounds.contains(currentPlace.coordinates) && zoom >= 8) {
		console.log("*******************************");
		console.log("---------You found it!---------");
		console.log("*******************************");
		var marker = new google.maps.Marker({position: currentPlace.coordinates, map: map});
		currentPlaceIndex = currentPlaceIndex - 1;
		currentPlace = findMe[currentPlaceIndex];

	};
}