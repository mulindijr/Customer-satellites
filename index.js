document.addEventListener('DOMContentLoaded', () => {
    // Get references to the container and satellites container elements.
    const container = document.querySelector('.container');
    const satellitesContainer =  document.querySelector('.satellites-container');

    // Fetch satellite data from the API.
    fetch('https://isro.vercel.app/api/customer_satellites')
    .then(res => res.json())
    .then(data => {
       
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
