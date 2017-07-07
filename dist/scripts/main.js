var map1 = L.map( 'mapid2', {
  center: [20.0, 5.0],
  minZoom: 2,
  zoom: 2
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map1 );

$(document).ready(function() {
	$.getJSON("../json/country.geo.json")
	    .then(function (data) {

	    	var info = L.control();

			info.onAdd = function (map1) {
				this._div = L.DomUtil.create('div', 'info');
				this.update();
				return this._div;
			};

			info.update = function (props) {
				this._div.innerHTML = '<h4>Expartiés Français en 2013</h4>' +  (props ?
					'<b>' + props.name + '</b><br />' + props.annee2013 + ' expatriés'
					: 'Survoler la carte');
			};

			info.addTo(map1);

			function getColor(d) {
				return d > 100000 ? '#0000ff' :
						d > 50000  ? '#1919ff' :
						d > 20000  ? '#3232ff' :
						d > 10000  ? '#4c4cff' :
						d > 5000   ? '#6666ff' :
						d > 2000   ? '#7f7fff' :
						d > 1000   ? '#9999ff' :
									'#b2b2ff';
			}

			function style(feature) {
				return {
					weight: 2,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.7,
					fillColor: getColor(feature.properties.annee2013)
				};
			}

			function highlightFeature(e) {
				var layer = e.target;

				layer.setStyle({
					weight: 5,
					color: '#666',
					dashArray: '',
					fillOpacity: 0.7
				});

				if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
					layer.bringToFront();
				}

				info.update(layer.feature.properties);
			}

			var geojson;

			function resetHighlight(e) {
				geojson.resetStyle(e.target);
				info.update();
			}

			function zoomToFeature(e) {
				map1.fitBounds(e.target.getBounds());
			}

			function onEachFeature(feature, layer) {
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: zoomToFeature
				});
			}

			geojson = L.geoJson(data, {
				style: style,
				onEachFeature: onEachFeature
            }).addTo(map1);

			map1.attributionControl.addAttribution('Expatriés Français en 2013 | source: <a href="https://www.data.gouv.fr/fr/datasets/francais-de-l-etranger-inscriptions-au-registre-des-francais-etablis-hors-de-france-2001-2013/">Français établis hors de France de 2001 à 2013</a>');

			var legend = L.control({position: 'bottomright'});

			legend.onAdd = function (map1) {

				var div = L.DomUtil.create('div', 'info legend'),
					grades = [0, 1000, 2000, 5000, 10000, 20000, 50000, 100000],
					labels = [],
					from, to;

				for (var i = 0; i < grades.length; i++) {
					from = grades[i];
					to = grades[i + 1];

					labels.push(
						'<i style="background:' + getColor(from + 1) + '"></i> ' +
						from + (to ? '&ndash;' + to : '+'));
				}

				div.innerHTML = labels.join('<br>');
				return div;
			};

			legend.addTo(map1);
	    })
	    .fail(function(err){
	        console.log(err.responseText);
	    });
});

var map = L.map( 'mapid', {
  center: [20.0, 6.0],
  minZoom: 2,
  zoom: 2
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map );

$(document).ready(function() {
	$.getJSON("../json/expats_qualifie.json")
	    .then(function (data) {
	        var Icon = L.icon({
	            iconUrl: '../images/marker-icon.png'
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
	                	'<br/>2013: ' + feature.properties.annee2013);
	            }
	        }).addTo(map);
	        map.attributionControl.addAttribution('Expatriés Français de 2001 &agrave; 2013 | source: <a href="https://www.data.gouv.fr/fr/datasets/francais-de-l-etranger-inscriptions-au-registre-des-francais-etablis-hors-de-france-2001-2013/">Français établis hors de France de 2001 à 2013</a>');
	    })
	    .fail(function(err){
	        console.log(err.responseText);
	    });
});
