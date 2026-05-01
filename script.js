// AGREGAR MAPA
var map = L.map('map').setView([-34.6037, -58.3816], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: 'OpenStreetMap'
}).addTo(map);

//              MARCADOR CON POPUP
L.marker([-34.6037, -58.3816])
   .addTo(map)
   .bindPopup("Ubicación inicial")
   .openPopup();

//       MUESTRA COORDENADAS
map.on('click', function (e) {
   alert("Lat: " + e.latlng.lat + " Lng: " + e.latlng.lng);
});
