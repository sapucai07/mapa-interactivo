// AGREGAR MAPA
var map = L.map('map').setView([-34.6037, -58.3816], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: 'OpenStreetMap'
}).addTo(map);

// MARCADOR INICIAL
L.marker([-34.6037, -58.3816])
   .addTo(map)
   .bindPopup("Ubicación inicial")
   .openPopup();

// ARRAY DE PUNTOS
let puntos = [];

// VARIABLE DEL POLIGONO
let poligono = null;

// EVENTO CLICK
map.on('click', function(e) {
   let lat = e.latlng.lat;
   let lng = e.latlng.lng;

   puntos.push([lat, lng]);

   // si hay 3 puntos dibujar polígono
   if (puntos.length >= 3) {

       // eliminar el anterior si existe
       if (poligono) {
           map.removeLayer(poligono);
       }

       // crear nuevo polígono
       poligono = L.polygon(puntos, {
           color: 'blue',
           fillColor: 'lightblue',
           fillOpacity: 0.5
       }).addTo(map);
   }
});

