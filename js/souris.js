/**
 * @author maximelenne
 * 
 * 
 */


$(function() {
	
		
		
	var mousePosition;
	var catsPosition;
	var mesure;
	var geocoder = new google.maps.Geocoder();
	var geo = navigator.geolocation;
	var socket = io.connect('http://localhost:8080/');
	
	
	
	function geolocalisationHTML5(geoloc){
		var location = new google.maps.LatLng(geoloc.coords.latitude, geoloc.coords.longitude);
		mousePosition = location;
		console.log("geolocalisation HTML5" + mousePosition);
		socket.emit('send:coordsMouse', { user: 'max', type: 'mouse', lat: mousePosition.lat(), lng: mousePosition.lng(), date:$.now()});
		return location;
	}
	
	function geolocalisationIP(){
		// Google loader api
		// require <script type="text/javascript" src="http://www.google.com/jsapi"></script>
		if (google.loader.ClientLocation) {
			var location = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
			console.log("geolocalisation by ip");
			mousePosition = location;
			return location;
		}
	}
	
	
	
	
	/*
	 *
	 *
	 */
	
	function getMouse() {
		socket.on('load:coordsMouse', function (data) {
			mousePosition = new google.maps.LatLng(data['lat'], data['lng']);
			console.log("Position de la souris" + mousePosition);
			return mousePosition;
		});
	}
	function successLocalisationMouse(geoloc) {
		mousePosition = geolocalisationHTML5(geoloc);
		console.log("Position souris :" + mousePosition);
		return mousePosition;
	}
	
	function geolocaliseMouse() {
		if (geo) {
			geo.watchPosition(function(geoloc) {successLocalisationMouse(geoloc);}, function() {geolocalisationIP();});
		}
		else {
			mousePosition = geolocalisationIP();
		}
		
	}
	
	
	
	
	function getCats() {
		socket.on('load:coords', function (data) {
			catsPosition = new google.maps.LatLng(data['lat'], data['lng']);
		});
	}
	
	/*
	 * Calcul de la distance à vol d'oiseaux 
	 */
	function calculateDistance(address1, address2) {
		mesure = google.maps.geometry.spherical.computeDistanceBetween(address1, address2);
		console.log("distance entre le chats et la souris : " + mesure);
		return mesure;
	}
	
	/*
	 * Modification ecran cats
	 *
	 */
	function refreshCatsScreen() {
	if (mesure >= 5000) {
			$(".row-fluid").css("background-color", "rgb(103,146,230)");
		$(".row-fluid .btn").removeClass("btn-danger");
		$(".row-fluid .btn").addClass("btn-primary");
	}
	else if (mesure >= 1000 && mesure < 5000) {
		$(".row-fluid").css("background-color", "rgb(115,145,220)");
		$(".row-fluid .btn").removeClass("btn-danger");
		$(".row-fluid .btn").addClass("btn-primary");
	}
	else if (mesure >= 500 && mesure < 1000) {
		$(".row-fluid").css("background-color", "rgb(127,144,210)");
		$(".row-fluid .btn").removeClass("btn-danger");
		$(".row-fluid .btn").addClass("btn-primary");
	}
	else if (mesure >= 250 && mesure < 500){
		$(".row-fluid").css("background-color", "rgb(139,143,200)");
		$(".row-fluid .btn").removeClass("btn-danger");
		$(".row-fluid .btn").addClass("btn-primary");
	}
	else if (mesure >= 100 && mesure < 250) {
		$(".row-fluid").css("background-color", "rgb(151,142,190)");
		$(".row-fluid button").css("background-color", "rgb(95,61,126)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-violet");
	}
	else if (mesure >= 75 && mesure < 100) {
		$(".row-fluid").css("background-color", "rgb(163,141,180)");
		$(".row-fluid button").css("background-color", "rgb(95,61,126)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-violet");
	}
	else if (mesure >= 50 && mesure < 75) {
		$(".row-fluid").css("background-color", "rgb(174,139,170)");
		$(".row-fluid button").css("background-color", "rgb(95,61,126)");
		$(".row-fluid .btn").removeClass("btn-danger");
		$(".row-fluid .btn").addClass("btn-violet");
	}
	else if (mesure >= 25 && mesure < 50) {
		$(".row-fluid").css("background-color", "rgb(186,138,160)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-danger");
	}
	else if (mesure >= 10 && mesure < 25) {
		$(".row-fluid").css("background-color", "rgb(198,137,150)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-danger");
	}
	else if (mesure >= 5 && mesure < 10) {
		$(".row-fluid").css("background-color", "rgb(210,136,140)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-danger");
	}
	else if (mesure < 5) {
		$(".row-fluid").css("background-color", "rgb(222,135,130)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-danger");
	}
	if ( mesure < 1000) 
		$(".row-fluid button").html(mesure.toFixed(2) + " m");
	else
		$(".row-fluid button").html((mesure/1000).toFixed(2) + " km");
	}
	
	
	/*
	 * Websocket avec node.js et socket.io
	 */
	
	
	
	  
	 
	getCats();
	geolocaliseMouse();
});