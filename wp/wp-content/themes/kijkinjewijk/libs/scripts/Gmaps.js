//global vars
var map;
var mapOptions = {
    zoom:8,
    minZoom:3,
    center:new google.maps.LatLng(51.83313, 4.14330),
    mapTypeId:google.maps.MapTypeId.TERRAIN
};
var styles = [
   {"stylers": [
     { "saturation": -75 },
     { "lightness": -5 },
     { "gamma": 1.25 }
     ]
 }];

var marker;

var NieuwsMarker = templateDir + "/libs/img/RecordMarker.png";
var VideoMarker  = templateDir + "/libs/img/RecordYT.png";
var MyPositionMarker = templateDir + "/libs/img/CurrentPositionMarker.png";


function mapInit() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({styles: styles});
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
        var title = item.title;
        var text = item.text;
        var image = item.image;
        var video = item.video;
        var category = item.category;
        if(longitude != '' && latitude != ''){
            createMarker(id,longitude,latitude,title,text,image,video,category);
        }
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

function createMarker(id,longitude,latitude,title,text,image,video,category) {
    var latLngPosition = new google.maps.LatLng(latitude,longitude);

    switch (category) {
        case '1': // Geen categorie
            iconUrl = NieuwsMarker;
            break;
        case '2': // Cultuur
            iconUrl = NieuwsMarker;
            break;
        case '3': // Sport
            iconUrl = NieuwsMarker;
            break;
        case '4': // Bouw
            iconUrl = NieuwsMarker;
            break;
        case '5': // Veiligheid
            iconUrl = NieuwsMarker;
            break;
        default:
            iconUrl = NieuwsMarker;
    }

   var marker = new google.maps.Marker({
        position:   latLngPosition,
        icon:       iconUrl,
        map:        map,
        title:      title,
    });

    marker.info = new google.maps.InfoWindow({
        content: '<h2>'+ title +'</h2>'+' <p>'+ text +'</p> <br /> '});

    // switch (category){
    //     case 'Nieuws':
    //         break;
    //     case 'NieuwsVideo':
    //         if(VideoUrl == '') {
    //             marker.info = new google.maps.InfoWindow({
    //                 content: '<h2>'+ title +'</h2>' + '<br />datum: '+date+'<br />Decibel: '+decibel
    //             });
    //         }
    //         else{
    //             marker.info = new google.maps.InfoWindow({
    //             content: '<h2>'+ title +'</h2>'+' <p>'+ Text +'</p> <br /> '+ '<iframe width="560" height="315" src="'+ video +'"" frameborder="0" allowfullscreen></iframe><br /><img src="http://lumini.ovh/school/kijkinjewijk/upload/'+ image +'" alt="Nieuws plaatje"><br />'});
    //         }
    //         break;
    //     default:
    //         marker.info = new google.maps.InfoWindow({
    //         content: '<h2>'+ title +'</h2>' + '<p>'+ video  +'</p>'
    //     });
    // }
    
    google.maps.event.addListener(marker, 'click', function(){
        map.setCenter(marker.getPosition());
        marker.info.open(map,marker);
    });
}

function focusToMarker(latLngPosition){
    map.setCenter(latLngPosition);
    map.setZoom(14);
}





