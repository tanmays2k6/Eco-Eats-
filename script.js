// Initialize the map centered on Bangalore
document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([12.9716, 77.5946], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var routeLayer; // To store the route layer

    // Handle form submission to get the best route
    document.getElementById('route-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const start = document.getElementById('start').value;
        const destination = document.getElementById('destination').value;

        if (start && destination) {
            // Show loading text while fetching the route
            document.getElementById('prediction-result').style.display = 'block';
            document.getElementById('result-text').innerText = 'Calculating best route...';

            // Geocode start and destination locations
            Promise.all([geocodeLocation(start), geocodeLocation(destination)])
                .then(locations => {
                    const [startCoords, destCoords] = locations;

                    // Fetch route from OSRM
                    fetchRoute(startCoords, destCoords);
                })
                .catch(error => {
                    console.error('Geocoding error:', error);
                    alert('Could not find one or both locations. Please try again.');
                });
        } else {
            alert('Please enter both start and destination locations.');
        }
    });

    // Function to geocode a location using OpenStreetMap's Nominatim API
    function geocodeLocation(location) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

        return axios.get(url).then(response => {
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return [parseFloat(lat), parseFloat(lon)];
            } else {
                throw new Error('Location not found');
            }
        });
    }

    // Function to fetch the route using OSRM
    function fetchRoute(startCoords, destCoords) {
        const [startLat, startLng] = startCoords;
        const [destLat, destLng] = destCoords;

        const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`;

        axios.get(url)
            .then(response => {
                const data = response.data;
                if (data.routes.length > 0) {
                    const route = data.routes[0];
                    const routeDistance = (route.distance / 1000).toFixed(2); // Convert to kilometers

                    // Display route distance
                    document.getElementById('result-text').innerText = `Best route is ${routeDistance} km long.`;

                    // Add route to the map
                    if (routeLayer) {
                        map.removeLayer(routeLayer);
                    }
                    routeLayer = L.geoJSON(route.geometry, {
                        style: { color: 'blue', weight: 5 }
                    }).addTo(map);
                    map.fitBounds(routeLayer.getBounds());
                } else {
                    alert('No route found. Please try different locations.');
                }
            })
            .catch(error => {
                console.error('Routing error:', error);
                alert('An error occurred while fetching the route.');
            });
    }
});
