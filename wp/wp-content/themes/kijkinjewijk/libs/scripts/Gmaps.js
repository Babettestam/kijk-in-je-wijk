//global Map vars
var map;
var mapOptions = {
    zoom:8,
    minZoom:3,
    center:new google.maps.LatLng(51.83313, 4.14330),

    mapTypeId:google.maps.MapTypeId.TERRAIN
};//einde var mapoptions

var marker;

getMeldingen();

//haalt alle foto's uit de file coords.php
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
        var bestandnaam = item.FileName;
		var type = item.Type;
		var date = item.Date;
		var decibel = item.Decibel;
		var klacht = item.Klacht;
//voert createmarker uit met parameters
        createMarker(id,longitude,lattitude,titel,bestandnaam,type,date,decibel,klacht);
		
    })//einde .each
/*
		echo $Longitude;
		echo $Latitude;
		echo $Title;
		echo $FileName;
		echo $Type;
		echo $Date;
		echo $Decibel;
		echo $Name;
		echo $Klacht;




*/
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
		icon:  "http://lumini.ovh/ruis/img/marker/CurrentPositionMarker.png",
		
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
function createMarker(id,longitude,lattitude,titel,bestandnaam,type,date,decibel,klacht) {
   // var latLngPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    var latLngPosition = new google.maps.LatLng(lattitude,longitude);
    //Create marker with custom assets

	switch (type) {
    case 'Klacht':
        iconUrl = "http://lumini.ovh/ruis/img/marker/AlertMarker.png";
        break;
    case 'Opname':
        iconUrl = "http://lumini.ovh/ruis/img/marker/RecordMarker.png";
        break;
    default:
        iconUrl = 'http://lumini.ovh/ruis/img/marker/RecordMarker.png' ;
    }

   var marker = new google.maps.Marker({
        position:latLngPosition,
		icon:  iconUrl,
        map:map
    });

	
switch (type){
    case 'Klacht':
        marker.info = new google.maps.InfoWindow({
	//content: '<h2>'+ titel +'</h2>' + '<p>'+ bestandnaam  +'</p>' + '<audio controls><source src="sounds/'+ bestandnaam +'" type="audio/ogg"><source src="sounds/'+ bestandnaam +'" type="audio/mp3">Your browser does not support the audio element.</audio>'
		content: '<h2>'+ titel +'</h2>' + '<p>'+date+   '<br />klacht: '+klacht+ '</p>'
    }); //einde marker info
        break;
    case 'Opname':

		if(bestandnaam == '')
		{
		console.log("ik kom wel in deze");
	marker.info = new google.maps.InfoWindow({

		content: '<h2>'+ titel +'</h2>' + '<br />datum: '+date+'<br />Decibel: '+decibel
		}); //einde marker info
		
		}
		else{
		marker.info = new google.maps.InfoWindow({
	content: '<h2>'+ titel +'</h2>' + '<audio controls><source src="sounds/'+ bestandnaam +'" type="audio/ogg"><source src="sounds/'+ bestandnaam +'" type="audio/mp3">Your browser does not support the audio element.</audio>'+'<p>titel: '+titel+'<br />datum: '+date+'<br />Decibel: '+decibel 
}); //einde marker info
	
	}

        break;
    default:
        marker.info = new google.maps.InfoWindow({
	//content: '<h2>'+ titel +'</h2>' + '<p>'+ bestandnaam  +'</p>' + '<audio controls><source src="sounds/'+ bestandnaam +'" type="audio/ogg"><source src="sounds/'+ bestandnaam +'" type="audio/mp3">Your browser does not support the audio element.</audio>'
content: '<h2>'+ titel +'</h2>' + '<p>'+ bestandnaam  +'</p>'
    }); //einde marker info
    }
	


    google.maps.event.addListener(marker, 'click', function(){
        marker.info.open(map,marker);
    });//einde eventlistener



    //focusToMarker(latLngPosition);
}//einde create marker
function focusToMarker(latLngPosition){
    map.setCenter(latLngPosition);
    map.setZoom(17);
}

