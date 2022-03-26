//console.log(locations);

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidmlqYXktMjgiLCJhIjoiY2wwN2premNqMDR0NTNqazZoN25nNmtydiJ9.n8ml0HEMZiVrzkV4Cdr0Vg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vijay-28/cl12690jp004314o2b1toqp06',
    scrollZoom: false,
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
