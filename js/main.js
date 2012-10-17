
/**
 * @author maximelenne
 * 
 * 
 */
var mousePosition;
var catsPosition;
var mesure;
var geocoder = new google.maps.Geocoder();

function getMouse() {
	mousePosition = new google.maps.LatLng(50.6331543, 3.0433570000000145);
	console.log("Position de la souris" + mousePosition);
}

function getCats() {
	//localisation du chat
	var geo = navigator.geolocation;
	// Position du visiteur geolocalisation
	if (geo) {
		geo.watchPosition(function(geoloc){
			catsPosition = new google.maps.LatLng(geoloc.coords.latitude, geoloc.coords.longitude);
			console.log("Position du chat (geolocalisation HTML5)" + catsPosition);
			calculateDistance(mousePosition, catsPosition);
			refreshCatsScreen();
		}, function(){
			// Google loader api
			// require <script type="text/javascript" src="http://www.google.com/jsapi"></script>
			if (google.loader.ClientLocation) {
				catsPosition = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
				console.log("Position du chat (localisation by ip)" + catsPosition);
				console.log("city by ip : "+ google.loader.ClientLocation.address.city);
			}
		});
	}
	else {
		if (google.loader.ClientLocation) {
			catsPosition = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
			console.log("Position du chat (localisation by ip)" + catsPosition);
			console.log("city by ip : "+ google.loader.ClientLocation.address.city);
		}
	}
}

/*
 * Calcul de la distance à vol d'oiseaux 
 */
function calculateDistance(address1, address2) {
	mesure = (google.maps.geometry.spherical.computeDistanceBetween(address1, address2) / 1000).toFixed(2);
	console.log("distance entre le client et le shop : " + mesure);
}

/*
 * Modification ecran cats
 *
 */
function refreshCatsScreen() {
	//Array ( [1] => 114,145,221 [2] => 125,144,212 [3] => 135,143,203 [4] => 146,142,194 [5] => 157,141,185 [6] => 168,140,175 [7] => 179,139,166 [8] => 190,138,157 [9] => 200,137,148 [10] => 211,136,139 )
	if (mesure >= 5000) {
		$(".row-fluid").css("background-color", "rgb(114,145,221)");
		$(".row-fluid .btn").removeClass("btn-danger");
		$(".row-fluid .btn").addClass("btn-primary");
	}
	else if (mesure >= 1000 && mesure < 5000) {
		$(".row-fluid").css("background-color", "rgb(125,144,212)");
	}
	else if (mesure >= 500 && mesure < 1000) {
		$(".row-fluid").css("background-color", "rgb(135,143,203)");
	}
	else if (mesure >= 250 && mesure < 500){
		$(".row-fluid").css("background-color", "rgb(146,142,194)");
	}
	else if (mesure >= 100 && mesure < 250) {
		$(".row-fluid").css("background-color", "rgb(157,141,185)");
	}
	else if (mesure >= 75 && mesure < 100) {
		$(".row-fluid").css("background-color", "rgb(168,140,175)");
	}
	else if (mesure >= 50 && mesure < 75) {
		$(".row-fluid").css("background-color", "rgb(179,139,166)");
	}
	else if (mesure >= 25 && mesure < 50) {
		$(".row-fluid").css("background-color", "rgb(190,138,157)");
	}
	else if (mesure >= 10 && mesure < 25) {
		$(".row-fluid").css("background-color", "rgb(200,137,148)");
	}
	else if (mesure >= 5 && mesure < 10) {
		$(".row-fluid").css("background-color", "rgb(211,136,139)");
	}
	else if (mesure < 5) {
		$(".row-fluid").css("background-color", "rgb(211,136,139)");
		$(".row-fluid .btn").removeClass("btn-primary");
		$(".row-fluid .btn").addClass("btn-danger");
	}
	$(".row-fluid button").html(mesure);
}
