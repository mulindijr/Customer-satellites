document.addEventListener('DOMContentLoaded', () => {
    // Get references to the container and satellites container elements.
    const container = document.querySelector('.container');
    const satellitesContainer = document.querySelector('.satellites-container');

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
                    satelliteId.textContent = satellite.id;

                    // Create a container for satellite data.
                    const satelliteData = document.createElement('div');
                    satelliteData.className = 'satellite-data';
                    satelliteData.id = `satellite-${satellite.id}`;

                    // Create elements to display specific satellite data.
                    const satelliteName = document.createElement('p');
                    satelliteName.textContent = `Satellite Name: ${satellite.id}`;

                    const country = document.createElement('p');
                    country.textContent = `Country: ${satellite.country}`;

                    const launchDate = document.createElement('p');
                    launchDate.textContent = `Launch Date: ${satellite.launch_date}`;

                    const mass = document.createElement('p');
                    mass.textContent = `Mass: ${satellite.mass}`;

                    const launcher = document.createElement('p');
                    launcher.textContent = `Launcher: ${satellite.launcher}`;

                    // Create a display area for comments
                    function fetchAndDisplayComments() {
                        fetch('http://localhost:3000/comments')
                            .then(res => res.json())
                            .then(comments => {
                                comments.forEach(comment => {
                                    const displayComment = document.createElement('p');
                                    displayComment.className = 'comment-display';
                                    displayComment.textContent = `Comment: ${comment.text}`;
                                    const commentId = comment.id;

                                    const deleteComment = document.createElement('button')
                                    deleteComment.className = 'delete-btn'
                                    deleteComment.textContent = 'delete'

                                    deleteComment.addEventListener('click',() => {
                                        deleteButton(commentId)
                                    })
                                
                                    // Create a unique ID for the comment element, e.g., 'comment-1', 'comment-2', etc.
                                    displayComment.id = `comment-${commentId}`;
                                
                                    // Append the comment to the appropriate satelliteData
                                    satelliteData.appendChild(displayComment);
                                    displayComment.appendChild(deleteComment)
                                    
                                });
                            })
                        .catch(error => {
                            console.error("Error fetching comments:", error);
                        });
                    }
                
                    // Fetch and display comments initially
                    fetchAndDisplayComments();

                    // Create a comment section
                    const commentSection = document.createElement('form');
                    commentSection.className = 'comment-section';
                    commentSection.innerHTML = `
                        <textarea id="comment-input" placeholder="Write your comment here"></textarea>
                        <button type="submit">Add Comment</button>
                    `;

                    // Add a click event listener to toggle the visibility of satellite data.
                    satelliteId.addEventListener('click', () => {
                        satelliteData.style.display = satelliteData.style.display === 'block' ? 'none' : 'block';
                    });

                    // Append the satellite data elements to the DOM.
                    satelliteData.appendChild(satelliteName)
                    satelliteData.appendChild(country);
                    satelliteData.appendChild(launchDate);
                    satelliteData.appendChild(mass);
                    satelliteData.appendChild(launcher);
                    satelliteData.appendChild(commentSection);
                    div.appendChild(satelliteId);
                    div.appendChild(satelliteData);
                    satellitesContainer.appendChild(div);
                });
            } else {
                console.error('API response is not an array');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Handle the comment form submission
    container.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentInput = e.target.querySelector('#comment-input');
        const comment = commentInput.value;

        // Post the new comment
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: comment}),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
        })
        .catch(error => {
            console.error("Error posting comment:", error);
        });

        commentInput.value = '';
    });

    function deleteButton(id) {
        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 204) {
                    // Successful deletion (No Content)
                    console.log('Comment deleted successfully.');
                    const commentElement = document.getElementById(`comment-${id}`);
                    if (commentElement) {
                        commentElement.remove();
                    }
                    window.location.reload(false)
                } else if (res.status === 404) {
                    console.error('Comment not found.');
                } else {
                    console.error('An error occurred while deleting the comment.');
                }
            })
        .catch(error => {
            console.error('Error deleting comment:', error);
        });
        
    }
    
});
