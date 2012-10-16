
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
		geo.getCurrentPosition(function(geoloc){
			catsPosition = new google.maps.LatLng(geoloc.coords.latitude, geoloc.coords.longitude);
			console.log("Position du chat (geolocalisation HTML5)" + catsPosition);
			
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
	if(mesure < 15) {
		console.log("dans le périmetre");
		return true;
	}
	else {
		console.log("pas dans le périmetre");
		return false;
  }
	
	
}


