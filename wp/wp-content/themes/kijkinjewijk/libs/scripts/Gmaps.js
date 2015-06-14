//global vars
var map;
var mapOptions = {
    zoom:8,
    minZoom:3,
    center:new google.maps.LatLng(51.83313, 4.14330),
    mapTypeId:google.maps.MapTypeId.TERRAIN
};

var marker;

var NieuwsMarker = templateDir + "/libs/img/RecordMarker.png";
var VideoMarker  = templateDir + "/libs/img/RecordYT.png";
var MyPositionMarker = templateDir + "/libs/img/CurrentPositionMarker.png";


function mapInit() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    geoLocationAskPermission();

    // google.maps.event.addListener(marker, "mouseover", function() {
    //     infowindow.open(map, marker);
    // });

    getAllMeldingenCallBack(jsonData);
}

function getAllMeldingenCallBack(data) {
    $.each(jQuery.parseJSON(data), function (i, item) {
        var id = item.id;
        var longitude = item.longitude;
        var latitude = item.latitude;
        var titel = item.title;
        var text = item.text;
        var afbeelding = item.image;
        var videoUrl = item.video;
        var type = item.type;

        createMarker(id,longitude,latitude,titel,text,afbeelding,videoUrl,type);
    })   
}

function geoLocationAskPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createPlace);
    }
}


function createPlace(data) {
    var latLngPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);

    new google.maps.Marker({
        position:latLngPosition,
        title:'Mijn Locatie',
        icon:  MyPositionMarker,
        map:map
    });

    focusToMarker(latLngPosition);
}

function createMarker(id,longitude,latitude,titel,Text,Afbeelding,VideoUrl,type) {
    var latLngPosition = new google.maps.LatLng(latitude,longitude);


    switch (type) {
        case 'Nieuws':
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

   console.log(latLngPosition);


    switch (type){
        case 'Nieuws':
            marker.info = new google.maps.InfoWindow({
            content: '<h2>'+ titel +'</h2>'+' <p>'+ Text +'</p> <br /> '}); //einde marker info
            break;
        case 'NieuwsVideo':
            if(VideoUrl == '') {
                marker.info = new google.maps.InfoWindow({
                    content: '<h2>'+ titel +'</h2>' + '<br />datum: '+date+'<br />Decibel: '+decibel
                });
            }
            else{
                marker.info = new google.maps.InfoWindow({
                content: '<h2>'+ titel +'</h2>'+' <p>'+ Text +'</p> <br /> '+ '<iframe width="560" height="315" src="'+ VideoUrl +'"" frameborder="0" allowfullscreen></iframe><br /><img src="http://lumini.ovh/school/kijkinjewijk/upload/'+ Afbeelding +'" alt="Nieuws plaatje"><br />'}); //einde marker info
            }
            break;
        default:
            marker.info = new google.maps.InfoWindow({
            content: '<h2>'+ titel +'</h2>' + '<p>'+ VideoUrl  +'</p>'
        });
    }
    
    google.maps.event.addListener(marker, 'click', function(){
        map.setZoom(18);
    map.setCenter(marker.getPosition());
        marker.info.open(map,marker);
    });
}

function focusToMarker(latLngPosition){
    map.setCenter(latLngPosition);
    map.setZoom(17);
}





