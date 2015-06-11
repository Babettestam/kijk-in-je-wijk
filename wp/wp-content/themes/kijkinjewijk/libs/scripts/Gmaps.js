//global vars
var map;
var mapOptions = {
    zoom:8,
    minZoom:3,
    center:new google.maps.LatLng(51.83313, 4.14330),

    mapTypeId:google.maps.MapTypeId.TERRAIN
};//einde var mapoptions

var marker;
var NieuwsMarker = "img/marker/RecordMarker.png";
var VideoMarker  = "img/marker/RecordYT.png";
var MyPositionMarker = "img/marker/CurrentPositionMarker.png";

getMeldingen();

//haalt alle meldingen uit de file coords.php
function getMeldingen() {
    $.getJSON(
        "coords.php",
        getAllMeldingenCallBack
    );
}//einde function getfotos

//zet data van json in verschillende variablen
function getAllMeldingenCallBack(data) {
  // console.log(data);
    $.each(data, function (i, item) {
        //console.log(item)
        var id = item.ID;
       
        var longitude = item.Longitude;
		 var lattitude = item.Latitude;
        var titel = item.Title;
		var Text = item.Text;
		var Afbeelding = item.Afbeelding;
        var VideoUrl = item.VideoName;
		var type = item.Type;
//voert createmarker uit met parameters
        createMarker(id,longitude,lattitude,titel,Text,Afbeelding,VideoUrl,type);
		
    })//einde .each


	
}//einde getAllFotosCallBack





////////////////////////////////////////////////document start /////////////////////////


$(document).ready(init); //voer init uit . als document ready is.

/**
 * Initialize Application
 */
function init() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    geoLocationAskPermission();
    //createMarker();


// Add listner for marker. You can add listner for any object. It is just an example in which I am specifying that infowindow will be open on marker mouseover
    google.maps.event.addListener(marker, "mouseover", function() {
        infowindow.open(map, marker);
    });



}

function geoLocationAskPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createPlace);
    }
}


function createPlace(data) {
    var latLngPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);

    //Create marker with custom assets
    new google.maps.Marker({
        position:latLngPosition,
        title:'Mijn Locatie',
		icon:  MyPositionMarker,
		
		map:map
		
    });
console.log(latLngPosition);

    focusToMarker(latLngPosition);
}


/**
 * Create a marker for the map
 *
 * @param data
 */
function createMarker(id,longitude,lattitude,titel,Text,Afbeelding,VideoUrl,type) {
   // var latLngPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    var latLngPosition = new google.maps.LatLng(lattitude,longitude);
    //Create marker with custom assets

	switch (type) {
    case 'Nieuws':
       // iconUrl = "http://lumini.ovh/school/kijkinjewijk/img/marker/RecordMarker.png";
		iconUrl = NieuwsMarker;
        break;
    case 'NieuwsVideo':
        iconUrl = VideoMarker;
        break;
    default:
        iconUrl = NieuwsMarker;
    }

   var marker = new google.maps.Marker({
        position:latLngPosition,
		icon:  iconUrl,
        map:map,
		title: titel,

    });


switch (type){
    case 'Nieuws':
        marker.info = new google.maps.InfoWindow({
	//content: '<h2>'+ titel +'</h2>' + '<p>'+ VideoUrl  +'</p>' + '<audio controls><source src="sounds/'+ VideoUrl +'" type="audio/ogg"><source src="sounds/'+ VideoUrl +'" type="audio/mp3">Your browser does not support the audio element.</audio>'
	content: '<h2>'+ titel +'</h2>'+' <p>'+ Text +'</p> <br /> '}); //einde marker info
	
    


	//einde marker info
        break;
    case 'NieuwsVideo':
console.log("Nieuws Switch");
		if(VideoUrl == '')
		{
		//console.log("ik kom wel in deze");
	marker.info = new google.maps.InfoWindow({

		content: '<h2>'+ titel +'</h2>' + '<br />datum: '+date+'<br />Decibel: '+decibel
		}); //einde marker info
		
		}
		else{
			marker.info = new google.maps.InfoWindow({
			content: '<h2>'+ titel +'</h2>'+' <p>'+ Text +'</p> <br /> '+ '<iframe width="560" height="315" src="'+ VideoUrl +'"" frameborder="0" allowfullscreen></iframe><br /><img src="http://lumini.ovh/school/kijkinjewijk/upload/'+ Afbeelding +'" alt="Nieuws plaatje"><br />'}); //einde marker info
	
		}

        break;
    default:
		console.log("Default Switch");
        marker.info = new google.maps.InfoWindow({
		//content: '<h2>'+ titel +'</h2>' + '<p>'+ VideoUrl  +'</p>' + '<audio controls><source src="sounds/'+ VideoUrl +'" type="audio/ogg"><source src="sounds/'+ VideoUrl +'" type="audio/mp3">Your browser does not support the audio element.</audio>'
		content: '<h2>'+ titel +'</h2>' + '<p>'+ VideoUrl  +'</p>'
    }); //einde marker info
    }
	


    google.maps.event.addListener(marker, 'click', function(){
        marker.info.open(map,marker);
		console.log(marker);
    });//einde eventlistener



    //focusToMarker(latLngPosition);
}//einde create marker
function focusToMarker(latLngPosition){
    map.setCenter(latLngPosition);
    map.setZoom(17);
}

