// CAPAS BASE
let mapaNormal = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
});

let mapaOscuro = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: 'CartoDB'
});

// CREAR MAPA
var map = L.map('map', {
    center: [-34.6037, -58.3816],
    zoom: 13,
    layers: [mapaNormal]
});

// CONTROL DE CAPAS
let baseMaps = {
    "Normal": mapaNormal,
    "Oscuro": mapaOscuro
};

L.control.layers(baseMaps).addTo(map);

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

// calcular la distancia
let puntosDistancia = [];

map.on('click', function(e) {

    // guardar punto
    puntosDistancia.push(e.latlng);

    // si hay 2 puntos → calcular
    if (puntosDistancia.length === 2) {

        let distancia = puntosDistancia[0].distanceTo(puntosDistancia[1]);

        alert("Distancia: " + distancia.toFixed(2) + " metros");

        // resetear para volver a medir
        puntosDistancia = [];
    }

});