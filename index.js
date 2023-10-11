document.addEventListener('DOMContentLoaded', () => {
    // Get references to the container and satellites container elements.
    const container = document.querySelector('.container');
    const satellitesContainer =  document.querySelector('.satellites-container');

    // Fetch satellite data from the API.
    fetch('https://isro.vercel.app/api/customer_satellites')
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.customer_satellites)) {
            data.customer_satellites.forEach(satellite => {
                // Create a new div element for each satellite.
                const div = document.createElement('div');
                div.className = 'satellites-container';

                // Create an element to display the satellite ID.
                const satelliteId = document.createElement('li');
                satelliteId.textContent = `${satellite.id}`;

                // Create a container for satellite data.
                const satelliteData = document.createElement('div');
                satelliteData.className = 'satellite-data'

                // Create elements to display specific satellite data.
                const country = document.createElement('p');
                country.textContent = `Country: ${satellite.country}`;

                const launchDate = document.createElement('p');
                launchDate.textContent = `Launch-Date: ${satellite.launch_date}`

                const mass = document.createElement('p');
                mass.textContent = `Mass: ${satellite.mass}`

                const launcher = document.createElement('p');
                launcher.textContent = `Launcher: ${satellite.launcher}`
                
                // Append the satellite data elements to the DOM.
                satellitesContainer.appendChild(satelliteId);
                satelliteData.appendChild(country);
                satelliteData.appendChild(launchDate);
                satelliteData.appendChild(mass);
                satelliteData.appendChild(launcher);
                satelliteId.appendChild(satelliteData);
                container.appendChild(satellitesContainer);

            });
        } else {
            console.error('API response is not an array');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
