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
			pushPositionWs();
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
	mesure = google.maps.geometry.spherical.computeDistanceBetween(address1, address2);
	console.log("distance entre le client et le shop : " + mesure);
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


var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  
function pushPositionWs() {
	
}

    // Enable pusher logging - don't include this in production
    /*Pusher.log = function(message) {
      if (window.console && window.console.log) window.console.log(message);
    };

    // Flash fallback logging - don't include this in production
    WEB_SOCKET_DEBUG = true;
    
    
    Pusher.channel_auth_transport = 'jsonp';
  	Pusher.channel_auth_endpoint = 'php/pusher_auth.php'; 

    var pusher = new Pusher('0a3b796957d21bc66fbd');
    var channel = pusher.subscribe('private-channel');
    var user = "chats-" + Math.random().toString(3).substring(2,15);
    var type = "chat";
    var data = JSON.stringify([user,type]);
    
    channel.bind('client-someeventname', function(data) {
      alert(data);
    });
    
    */
    
    
});