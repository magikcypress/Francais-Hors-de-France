var map = L.map( 'mapid', {
  center: [20.0, 6.0],
  minZoom: 2,
  zoom: 2
})

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map )

$(document).ready(function() {
	$.getJSON("/dist/json/expats_qualifie.json")
	    .then(function (data) {
	        var Icon = L.icon({
	            iconUrl: '/dist/images/marker-icon.png'
	        });
	        L.geoJson(data, {
	            pointToLayer: function (feature, latlng) {
					L.marker(latlng).addTo(map)
					        .bindPopup('Nombre d\'expatriés par années' + '<br/><b>' + feature.properties.name +
	                	'</b><br/>2001: ' + feature.properties.annee2001 +
	                	'<br/>2002: ' + feature.properties.annee2002 +
	                	'<br/>2003: ' + feature.properties.annee2003 +
	                	'<br/>2004: ' + feature.properties.annee2004 +
	                	'<br/>2005: ' + feature.properties.annee2005 +
	                	'<br/>2006: ' + feature.properties.annee2006 +
	                	'<br/>2007: ' + feature.properties.annee2007 +
	                	'<br/>2008: ' + feature.properties.annee2008 +
	                	'<br/>2009: ' + feature.properties.annee2009 +
	                	'<br/>2010: ' + feature.properties.annee2010 +
	                	'<br/>2011: ' + feature.properties.annee2011 +
	                	'<br/>2012: ' + feature.properties.annee2012 +
	                	'<br/>2013: ' + feature.properties.annee2013)
	            }
	        }).addTo(map);
	        map.attributionControl.addAttribution('Expatriés Français de 2001 &agrave; 2013 | source: <a href="https://www.data.gouv.fr/fr/datasets/francais-de-l-etranger-inscriptions-au-registre-des-francais-etablis-hors-de-france-2001-2013/">Français établis hors de France de 2001 à 2013</a>');
	    })
	    .fail(function(err){
	        console.log(err.responseText)
	    });
});