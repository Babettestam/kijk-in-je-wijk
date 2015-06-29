//global vars
var map;
var mapOptions = {
    zoom:18,
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

var markers = {};

var marker;

var NieuwsMarker = templateDir + "/libs/img/RecordMarker.png";
var MyPositionMarker = templateDir + "/libs/img/CurrentPositionMarker.png";
var iconBouw = templateDir + "/libs/img/bouw.png";
var iconCultuur = templateDir + "/libs/img/cultuur.png";
var iconCriminaliteit = templateDir + "/libs/img/criminaliteit.png";
var iconOverig = templateDir + "/libs/img/overig.png";
var iconSport = templateDir + "/libs/img/sport.png";

//global infowindow
var infowindow = new google.maps.InfoWindow();


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
        var filter = item.filter;

        if (category == filter) {
            $('#'+filter).addClass('active');

            if(longitude != '' && latitude != ''){
                createMarker(id,longitude,latitude,title,text,image,video,category);
            }
        }
        if(filter == null || filter == "0"){
            $('#0').addClass('active');
            //create alle markers
            if(longitude != '' && latitude != ''){
               createMarker(id,longitude,latitude,title,text,image,video,category);
            }
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

function createMarker(id,longitude,latitude,title,text,imageurl,video,category) {
    var latLngPosition = new google.maps.LatLng(latitude,longitude);
    switch (category[0]) {
        case 1: // Geen categorie
            iconUrl = iconOverig;
            break;
        case 2: // Cultuur
            iconUrl = iconCultuur;
            break;
        case 3: // Sport
            iconUrl = iconSport;
            break;
        case 4: // Bouw
            iconUrl = iconBouw;
            break;
        case 5: // Veiligheid
            iconUrl = iconCriminaliteit;
            break;
        default:
            iconUrl = iconOverig;
    }

    var image = new google.maps.MarkerImage(
        iconUrl,
        null,
        null,
        null,
        new google.maps.Size(35, 35)
    );

   var marker = new google.maps.Marker({
        id: id,
        position:   latLngPosition,
        icon:       image,
        map:        map,
        title:      title,
    });

    markers[id] = marker;
    
    google.maps.event.addListener(marker, 'mouseover', function(){
		 var HardcodedImg = "<img src='"+ imageurl['url'] + "'></img>";
		 var contentString = '<div class="gmap-window"><h2>'+ title +'</h2>' + HardcodedImg +'</div>';
		 
		infowindow.setContent(contentString);
		infowindow.open(map,marker);

    });

    google.maps.event.addListener(marker, 'click', function(){
        var id = marker.id;
        window.location.href = "?item=" + id;
    });
}

function focusToMarker(latLngPosition){
    map.panTo(latLngPosition);
    map.setZoom(14);
}

function newsItemHover() {
  $('.news-item').on('mouseover', function(){
    
    var id = $(this).data('id');
    google.maps.event.trigger(markers[id], 'mouseover');
  })
}






