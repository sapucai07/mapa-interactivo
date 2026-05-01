// 1. Crear mapa
var map = L.map('map').setView([-34.6037, -58.3816], 13);

// 2. Capas base
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '© OpenStreetMap'
}).addTo(map);


// Agregar popup
L.marker([-34.6037, -58.3816])
   .addTo(map)
   .bindPopup("Ubicación inicial")
   .openPopup();

// clics y coordenadas
var popup = L.popup();

map.on('click', function (e) {
   puntos.push([e.latlng.lat, e.latlng.lng]);


   if (puntos.length === 2) {
      L.polyline(puntos, { color: 'blue' }).addTo(map);
   }
});

// Dibujar línea entre dos puntos
let puntos = [];
// hacer un poligono
let poligono;

map.on('click', function (e) {
   puntos.push([e.latlng.lat, e.latlng.lng]);
})
poligono = L.polygon(puntos, {
   color: 'red'
}).addTo(map); 