function getData(){
    
    L.Icon.Default.prototype.options.iconSize = [0, 0];
    L.Icon.Default.prototype.options.shadowSize = [0, 0];

    // load the cancer tract data 
    var counties = $.getJSON("data/CPIcities.geojson");
        
        $.when(counties).then(function(data) {
			
            var SimpleDisplay = L.layerGroup();
            var ColorDisplay = L.layerGroup();
            var map = L.map('mapdiv', {
                // Set latitude and longitude of the map center (required)
                center: [38.99766, -100.90838],
                // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
                zoom: 4,
                layers: [SimpleDisplay]
            });
            var basemap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 18,
                ext: 'png'
            }).addTo(map);
            
            var info = processData(data);
			createPropSymbols(info.timestamps, data);
            
			createLegend(info.min,info.max);
			createSliderUI(info.timestamps);
            
            
            
            
            <!--DEFINE FUNCTIONS (PROCESS DATA)-->
	function processData(data) {
		var timestamps = [];
		var min = Infinity; 
		var max = -Infinity;

		for (var feature in data.features) {

			var properties = data.features[feature].properties; 

			for (var attribute in properties) { 

				if ( attribute != 'id' &&
				  attribute != 'name' &&
				  attribute != 'lat' &&
				  attribute != 'long' ) {
						
					if ( $.inArray(attribute,timestamps) === -1) {
						timestamps.push(attribute);		
					}

					if (properties[attribute] < min) {	
						min = properties[attribute];
					}
						
				if (properties[attribute] > max) { 
						max = properties[attribute]; 
					}
				}
			}
		}

		return {
			timestamps : timestamps,
			min : '1987',
			max : '2018'
		}
	}
            
            <!--DEFINE FUNCTIONS (sym)-->

	function createPropSymbols(timestamps, data) {
		
        
        
		SDisplay = L.geoJson(data, {		

			pointToLayer: function(feature, latlng) {	

				return L.circleMarker(latlng, { 
			
				 fillColor: "#708598",
				 color: "#537898",
				 weight: 1, 
				 fillOpacity: 0.6 
				}).on({

					mouseover: function(e) {
						this.openPopup();
						this.setStyle({color: 'yellow'});
					},
					mouseout: function(e) {
						this.closePopup();
						this.setStyle({color: '#537898'});
							
					}
				});
			}
		}).addTo(SimpleDisplay);
        
        
        
        CDisplay = L.geoJson(data, {		

			pointToLayer: function(feature, latlng) {	

				return L.circleMarker(latlng, { 
				 weight: 1, 
				 fillOpacity: 0.6 
				}).on({

					mouseover: function(e) {
						this.openPopup();
						
					},
					mouseout: function(e) {
						this.closePopup();
						
							
					}
				});
			}}).addTo(ColorDisplay);

		updatePropSymbols(timestamps[0]);

	}
            
            

<!--DEFINE FUNCTIONS (updatesym)-->

	function updatePropSymbols(timestamp) {
        
		
		CDisplay.eachLayer(function(layer) {
            
	
			var props = layer.feature.properties;
			var radius = calcPropRadius(props[timestamp]);
            var colors = getColor(props[timestamp]);
			var popupContent = "<b>" + String(props[timestamp]) + 
					" CPI</b><br>" +
					"<i>" + props.Name +
					"</i> in </i>" + 
					timestamp + "</i>";

			layer.setRadius(radius);
			layer.bindPopup(popupContent, { offset: new L.Point(0,-radius) });
            layer.setStyle({color :colors});
		});
        
        SDisplay.eachLayer(function(layer) {
            
	
			var props = layer.feature.properties;
			var radius = calcPropRadius(props[timestamp]);
			var popupContent = "<b>" + String(props[timestamp]) + 
					" CPI</b><br>" +
					"<i>" + props.Name +
					"</i> in </i>" + 
					timestamp + "</i>";

			layer.setRadius(radius);
			layer.bindPopup(popupContent, { offset: new L.Point(0,-radius) });
		});
	}

<!--wat-->
	function calcPropRadius(attributeValue) {

		var scaleFactor = 5;
		var area = attributeValue * scaleFactor;
		return Math.sqrt(area/Math.PI)*2;			
	}

 function getColor(d) {
    return d > 375 ? '#01004d' :
           d > 350  ? '#49006a' :
           d > 325  ? '#7a0177' :
           d > 300  ? '#ae017e' :
           d > 275   ? '#dd3497' :
           d > 250   ? '#f2559c' :
           d > 225   ? '#f768a1' :
           d > 200  ? '#fa9fb5' :
           d > 175  ? '#faa7a0' :
           d > 150  ? '#fcc5c0' :
           d > 125   ? '#ffd3cf' :
           d > 100   ? '#fcc5c0' :
           d > 75   ? '#fde0dd' :
           d > 50  ? '#fff1ed' :
           d > 25  ? '#fff7f3' :
           d > 10  ? '#fff7f3' :
                      '#FFEDA0';
    }    



<!--DEFINE FUNCTIONS (lgnd)-->
        
function createLegend(min, max) {
		 
		if (min < 10) {	
			min = 10; 
		}

		function roundNumber(inNumber) {

				return (Math.round(inNumber/10) * 10);  
		}

		var legendS = L.control( { position: 'bottomright' } );

		legendS.onAdd = function(map) {

		var legendContainer = L.DomUtil.create("div", "legend");  
		var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
		var classes = [roundNumber(10), roundNumber((400-10)/2), roundNumber(400)]; 
		var legendCircle;  
		var lastRadius = 0;
		var currentRadius;
		var margin;

		L.DomEvent.addListener(legendContainer, 'mousedown', function(e) { 
			L.DomEvent.stopPropagation(e); 
		});  

		$(legendContainer).append("<h2 id='legendTitle'>City CPI</h2>");
		
		for (var i = 0; i <= classes.length-1; i++) {  

			legendCircle = L.DomUtil.create("div", "legendCircle");  
			
			currentRadius = calcPropRadius(classes[i]);
			
			margin = -currentRadius - lastRadius - 2;

			$(legendCircle).attr("style", "width: " + currentRadius*2 + 
				"px; height: " + currentRadius*2 + 
				"px; margin-left: " + margin + "px" );				
			$(legendCircle).append("<span class='legendValue'>"+classes[i]+"</span>");

			$(symbolsContainer).append(legendCircle);

			lastRadius = currentRadius;

		}

		$(legendContainer).append(symbolsContainer); 

		return legendContainer; 

		};

		legendS.addTo(map);  

	} // end createLegend();


	 <!--// end createLegend();-->     
         


<!--DEFINE FUNCTIONS (ui)-->

function createSliderUI(timestamps) {
	
		var sliderControl = L.control({ position: 'bottomright'} );

		sliderControl.onAdd = function(map) {

			var slider = L.DomUtil.create("input", "range-slider");
	
			

			$(slider)
				.attr({'type':'range', 
					'max': timestamps[31], 
					'min': timestamps[0], 
					'step': 1,
					'value': String(timestamps[0])})
		  		.on('input change', function() {
		  		updatePropSymbols($(this).val().toString());
		  			$(".temporal-legend").text(this.value);
		  	});
			return slider;
		}

		sliderControl.addTo(map)
    
    L.DomEvent.addListener(sliderControl, 'mousedown', function(e) { 
        L.DomEvent.stopPropagation(e); 
    });
    
		createTemporalLegend(timestamps[0]); 
	}

            
            
    

<!--DEFINE FUNCTIONS (tl)-->

	function createTemporalLegend(startTimestamp) {

		var temporalLegend = L.control({ position: 'bottomright' }); 

		temporalLegend.onAdd = function(map) { 
			var output = L.DomUtil.create("output", "temporal-legend");
 			$(output).text(startTimestamp)
			return output; 
		}

		temporalLegend.addTo(map); 
	}
            
            var variableops = {
                "Color Symbols": ColorDisplay,
                "Simple Symbols": SimpleDisplay
            }
            
            
       // Add requested GeoJSON to map
            var kyCounties = L.geoJSON(counties.responseJSON).addTo(map);     
            var toggs = L.control.layers(variableops).addTo(map);
        
        })
      
	.fail(function() { alert("There has been a problem loading the data.")});
}
    
//when the page loads, AJAX & call createMap to render map tiles and data.
$(document).ready(init);
function init(){

    getData();
  	//create map home button
  	$("logoimg").on("click", function(){
    	globalMap.flyTo([38.99766, -100.90838], 5.5); //[lat, lng], zoom
    });
};