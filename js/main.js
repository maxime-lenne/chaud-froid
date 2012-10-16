
/**
 * @author maximelenne
 * 
 * 
 */


function customerInZone(addressShop, addressCustomer) {
	
	var mesure;
	var positionMagasin;
	var position;
	
	//console.log("Adresse shop fournis par magento : " + addressShop);
	//console.log("Adresse customer fournis par magento : " + addressCustomer);
	var geocoder = new google.maps.Geocoder();
	
	//localisation du client
	if(addressCustomer == undefined || addressCustomer == "") {
		var geo = navigator.geolocation;
		// Position du visiteur geolocalisation
		if (geo) {
			geo.getCurrentPosition(function(geoloc){
				position = new google.maps.LatLng(geoloc.coords.latitude, geoloc.coords.longitude);
				console.log("localisation customer geoloc" + position);
				
			}, function(){
				// Google loader api
				// require <script type="text/javascript" src="http://www.google.com/jsapi"></script>
				if (google.loader.ClientLocation) {
					position = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
					console.log("geolocation by ip" + google.loader.ClientLocation.address.city);
				}
			});
		}
		else {
			if (google.loader.ClientLocation) {
				// Google loader api
				// require <script type="text/javascript" src="http://www.google.com/jsapi"></script>
				position = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
				console.log("geolocation by ip" + google.loader.ClientLocation.address.city);
			}
		}
	}
	else {
		//position du client par rapport à son addresse 
		geocoder.geocode( { 'address': addressShop }, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		      position = results[0].geometry.location;
		    } else {
				if(position.value != "")
		      		alert("Geocode was not successful for the following reason: " + status);
		    }
		});
	}
	
	//position du magasin par rapport à son addresse
	
	if(addressShop != undefined || addressShop != "") {
		geocoder.geocode( { 'address': addressShop }, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		      positionMagasin = results[0].geometry.location;
		      console.log("Location magasin" + results[0].geometry.location);
		      
		      //distance vol d'oiseaux
		      mesure = (google.maps.geometry.spherical.computeDistanceBetween(position, positionMagasin) / 1000).toFixed(2);
		      console.log("distance entre le client et le shop : " + mesure);
		      
		      if(mesure < 15) {
		    	  console.log("dans le périmetre");
		    	  return true;
		      }
		      else {
		    	  console.log("pas dans le périmetre");
		    	  return false;
		      }
				  
		    } else {
				if(positionMagasin.value != "")
		      		alert("Geocode was not successful for the following reason: " + status);
		    }
		});
	}
	
}


