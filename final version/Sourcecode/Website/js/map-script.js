/**********************************************************************
**  SOURCE FILE:    map-script.js -  Javascript for the map page
**      
**  PROGRAM:    Android GPS // Big Brother
**
**  FUNCTIONS:
**
**
**  DATE:       February  27th, 2015
**              
**
**  DESIGNER:   Rhea Lauzon A00881688 
**          
**
**  PROGRAMMER: Rhea Lauzon A00881688
**
**  NOTES:
**  Displays the javascript map with various functionality.
*************************************************************************/

/** Google map **/
var map;

var geocoder;

/** Array of markers **/
var markers = new Array();

var MY_MAPTYPE_ID = 'custom_style';



var pin = {
    url: "../assets/marker.png", // url
    scaledSize: new google.maps.Size(17, 32), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(17.5, 32) // anchor
};


/*******************************************************************
** Function: $(document).ready()
**
** Date: February 27th, 2015
**
** Revisions: 
**
**
** Designer: Rhea Lauzon
**
** Programmer: Rhea Lauzon
**
** Interface:
**			$(document).ready(function()
**
** Returns:
**			void
**
** Notes:
**	When the document is ready it creates the google map and loading
**  the initial markers.
**
**********************************************************************/
$(document).ready(function()
{
	initialize();

	//load the data from the file
	loadData();

});


/*******************************************************************
** Function: initialize
**
** Date: February 27th, 2015
**
** Revisions: 
**
**
** Designer: Rhea Lauzon
**
** Programmer: Rhea Lauzon
**
** Interface:
**			initialize()
**
** Returns:
**			void
**
** Notes:
**	Initializes the google map and centers on user's location.
**
**********************************************************************/
function initialize() 
{

  var featureOpts = [
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "saturation": "0"
            },
            {
                "invert_lightness": true
            },
            {
                "visibility": "simplified"
            },
            {
                "hue": "#00e9ff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
];

	var mapOptions = {
	zoom: 6,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };


    //set the styling on the google map
	map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
	var styledMapOptions = {name: 'Custom Style'};
	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
  	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    //initialize the geocoder
    geocoder = new google.maps.Geocoder();


	// Try to receive the location from HTML
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(position) 
		{
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			map.setCenter(pos);
		},

		function() 
		{
			handleNoGeolocation(true);
		});
	}
	else 
	{
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	}
}

//function to handle no geolocation available
function handleNoGeolocation(errorFlag) 
{
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}



/*******************************************************************
** Function: loadData
**
** Date: March 1st, 2015
**
** Revisions: 
**
**
** Designer: Rhea Lauzon
**
** Programmer: Rhea Lauzon
**
** Interface:
**			loadData()
**
** Returns:
**			void
**
** Notes:
**	Parses the XML file for users
**
**********************************************************************/
function loadData()
{

	for (var i = 0; i < markers.length; i++)
	{
		markers[i].setMap(null);
	}

	if (window.XMLHttpRequest)
	{
		xhttp = new XMLHttpRequest();
	}

	//open the file
	xhttp.open("GET", "../data.xml", false);
	xhttp.send();
	xmlDoc = xhttp.responseXML;

	//fetch all the users
	var users = xmlDoc.getElementsByTagName("user");

	//loop through all the users
	for (var i = 0; i < users.length; i++)
	{
		//fetch the latitude and longitude
		var latitude = users[i].getElementsByTagName("latitude")[0].childNodes[0].nodeValue;
        var longitude = users[i].getElementsByTagName("longitude")[0].childNodes[0].nodeValue;

        //fetch the ID
        var name = users[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;

        //fetch the time
        var time = users[i].getElementsByTagName("time")[0].childNodes[0].nodeValue;

        //fetch the IP address
        var ip = users[i].getElementsByTagName("ip")[0].childNodes[0].nodeValue;

        //add the information to the map
        addMarker(name, ip, time, latitude, longitude);
	}

	//set the timer for the next update to refresh data
	window.setTimeout(loadData, 5000);

}


/*******************************************************************
** Function: addMarker
**
** Date: February 27th, 2015
**
** Revisions: 
**
**
** Designer: Rhea Lauzon
**
** Programmer: Rhea Lauzon
**
** Interface:
**          addMarker(name, ip, time, latitude, longitude)
**              name -- name of the marker
**              ip -- ip of the person
**              time -- time of the data
**              latitude -- latitude of the pin
**              longitude -- longitude of the pin
**
** Returns:
**          void
**
** Notes:
**  Fetches the address of the marker and adds it
**
**********************************************************************/
function addMarker(name, ip, time, latitude, longitude)
{
	//create the latLng object
	var location = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));

    //fetch the address via lat long object
    getAddress(name, ip, time, latitude, longitude);
}


/*******************************************************************
** Function: getAddress
**
** Date: March 13th, 2015
**
** Revisions: 
**
**
** Designer: Rhea Lauzon
**
** Programmer: Rhea Lauzon
**
** Interface:
**          getAddress(lat, lng)
**              lat -- the latitude
**              long -- the longitude
**
** Returns:
**          void
**
** Notes:
**  Fetches the address from the specified location and creates a marker.
**
**********************************************************************/
function getAddress(name, ip, time, lat, lng)
{
    //fetch the latitude and longitude as floats
    var lat = parseFloat(lat);
    var lng = parseFloat(lng);
    var location = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': location}, function(results, status) 
    {
        if (status == google.maps.GeocoderStatus.OK) 
        {
            if (results[0]) 
            {
              createMarker(name, ip, time, location, results[0].formatted_address);
            }
            else  if (result[1])
            {
                createMarker(name, ip, time, location, results[1].formatted_address);
            }
        } 
        else
        {
             createMarker(name, ip, time, location, "Unable to get address");
        }
    });
}


/*******************************************************************
** Function: createMarker
**
** Date: March 13th, 2015
**
** Revisions: 
**
**
** Designer: Rhea Lauzon
**
** Programmer: Rhea Lauzon
**
** Interface:
**          createMarker(name, ip, time, location, addr)
**              name -- name of the device
**              ip -- ip of the device
**              time -- time of the communication
**              location - latLng object of the device
**              addr -- approximate address of the device
**
** Returns:
**          void
**
** Notes:
**  Creates a marker at the device's approximate location.
**  On hover it displays the address and device information,
**  When a marker is clicked it zooms to its location.
**********************************************************************/
function createMarker(name, ip, time, location, addr)
{
    //make a marker
    var marker = new google.maps.Marker({ position: location, map: map, title: String(name), icon: pin});

    var contentString = "Name: " + name + "<br/>IP: " + ip +  "<br/>Time: " + time + "<br/>Address: " + addr;
   
       
    marker['infowindow'] = new google.maps.InfoWindow({content: contentString });


    //add a listener to open the info window on hover
    google.maps.event.addListener(marker, 'mouseover', function() 
    {
        this['infowindow'].open(map, this);
    });

    //add a listener to zoom on click
    google.maps.event.addListener(marker, 'click', function() 
    {
       map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng())); 
        map.setZoom(18); 
    });

 


    //add the marker to the array
    markers.push(marker);
}
