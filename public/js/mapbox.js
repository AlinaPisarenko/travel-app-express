
const locations = JSON.parse(document.getElementById('map').dataset.locations)

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpbmFwaXNhcmVua28iLCJhIjoiY2xpZW9vbzRlMHl1YjNkbXFpb2RodjM5ayJ9.-9_tDok1O8KlHlyO9uCn2w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alinapisarenko/cliequ41100an01p1hx3x7jaw',
  scrollZoom: false
  
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    
    const el = document.createElement('div')
    el.className = 'marker'

    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    })
    .setLngLat(loc.coordinates)
    .addTo(map)

    new mapboxgl
    .Popup({
        offset: 40
    })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map)


    bounds.extend(loc.coordinates)
})

map.fitBounds(bounds, {
    padding: {
        top: 200,
        bottom: 100,
        left: 100,
        right: 100
    }})