// CREAR MAPA
var map = L.map('map').setView([-34.6037, -58.3816], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map);

// Marcador personalizado
var customIcon = L.icon({
    iconUrl: './img/leaf-green.png',     // tu imagen
    shadowUrl: './img/leaf-shadow.png',  // opcional

    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

// MARCADOR INICIAL
L.marker([-34.6037, -58.3816])
    .addTo(map)
    .bindPopup("Ubicación inicial")
    .openPopup();

// VARIABLES
let puntos = [];
let poligono = null;
let marcadores = [];

// CLICK EN EL MAPA
map.on('click', function (e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    puntos.push([lat, lng]);

    // crear marcador
    let marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marcadores.push(marker);

    // dibujar polígono si hay 3 o más puntos
    if (puntos.length >= 3) {

        if (poligono) {
            map.removeLayer(poligono);
        }

        poligono = L.polygon(puntos, {
            color: 'blue',
            fillColor: 'lightblue',
            fillOpacity: 0.5
        }).addTo(map);
    }
});

// LIMPIAR MAPA
function limpiarMapa() {

    // borrar marcadores
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    // borrar polígono
    if (poligono) {
        map.removeLayer(poligono);
        poligono = null;
    }

    // reiniciar puntos
    puntos = [];
}