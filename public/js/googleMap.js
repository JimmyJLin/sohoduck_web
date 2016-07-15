
let map;
let markers = [];

const styles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#19a0d8' }
        ]
      }, {
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#ffffff' },
          { height: 6 }
        ]
      }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#e85113' }
        ]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -40 }
        ]
      }, {
        featureType: 'transit.station',
        stylers: [
          { weight: 9 },
          { hue: '#e85113' }
        ]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -25 }
        ]
      }
    ]

function initMap(){
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13,
    styles: styles,
    mapTypeControl: true
  })

  let locations = [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ]

    // style the markers a bit.  This will be our listing marker icon.
    const defaultIcon = makeMarkerIcon('0091ff')

    let bounds = new google.maps.LatLngBounds();

    let largeInfowindow = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      let position = locations[i].location;
      let title = locations[i].title;
      // Create a marker per location, and put into markers array.
      let marker = new google.maps.Marker({
        position: position,
        title: title,
        icon: defaultIcon,
        animation: google.maps.Animation.DROP,
        id: i
      })
      // Push the marker to our array of markers.
      markers.push(marker);

      // Extend the boundaries of the map for each marker
      bounds.extend(marker.position);

      // Create an onclick event to open an infowindo at each marker.
      marker.addListener('click', function(){
        populateInfoWindow(this, largeInfowindow)
      })

      // load marker on start
      marker.setMap(map);
    }


}


// supporting functions

// function to makeMarkerIcon
function makeMarkerIcon(markerColor) {
  let markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34))
  return markerImage
}
// This function populate the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based on the markers position
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if(infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if infowindow is closed.
    infowindow.addListener('closeclick', function(){
      infowindow.setMarker(null);
    })
  }
}
