fetch('https://my-flask-api-ywsd.onrender.com/top-songs')
    .then(response => response.text())  // Parse HTML response
    .then(data => {
        let list = document.getElementById('album-list');
        list.innerHTML = data;  // Insert the HTML directly into the page
    })
    .catch(error => console.error('Error:', error));
