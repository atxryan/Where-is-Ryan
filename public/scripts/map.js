document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
	
	var map = L.map('map').setView([30.25, -97.75], 13);
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'atxryan.3aedfc3a',
	    accessToken: 'pk.eyJ1IjoiYXR4cnlhbiIsImEiOiIxYzE5ZGEzOTFjODhlMDM2MmMxNGI2M2YzMmY1N2IxMiJ9.RthOyWs9POn-o07sfFpFUw'
	}).addTo(map);
	
	
	var popup = L.popup();

	function onMapClick(e) {
	    popup
	        .setLatLng(e.latlng)
	        .setContent("You clicked the map at " + e.latlng.toString())
	        .openOn(map);
	}
	
	map.on('click', onMapClick);


  });


