/**
 * @author maximelenne
 * 
 * 
 */


$(function() {
	
		
		
	var mousePosition;
	var catsPosition = {};
	var geocoder = new google.maps.Geocoder();
	var geo = navigator.geolocation;
	var socket = io.connect('http://localhost:8080/');
	
	
	
	function successLocalisationMouse(geoloc){
		var location = new google.maps.LatLng(geoloc.coords.latitude, geoloc.coords.longitude);
		mousePosition = location;
		console.log("geolocalisation HTML5" + location);
		socket.emit('send:coordsMouse', { user: 'max', type: 'mouse', lat: mousePosition.lat(), lng: mousePosition.lng(), date:$.now()});
	}
	
	function geolocalisationIP(){
		// Google loader api
		// require <script type="text/javascript" src="http://www.google.com/jsapi"></script>
		if (google.loader.ClientLocation) {
			var location = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
			console.log("geolocalisation by ip" + location);
			mousePosition = location;
		}
	}
	
	
	function geolocaliseMouse() {
		if (geo) {
			geo.watchPosition(function(geoloc) {successLocalisationMouse(geoloc);}, function() {geolocalisationIP();});
		}
		else {
			mousePosition = geolocalisationIP();
		}
	}
	
	socket.on('load:coords', function (data) {
		console.log("Coordonées chat " + data['user'] + " reçut : " + data['lat'] + " - " + data['lng']);
	});
	
	geolocaliseMouse();
});