fetch('fetch("https://portfolio-frontend-playground.vercel.app/api/proxy")  ')
    .then(response => response.text())  // Parse HTML response
    .then(data => {
        let list = document.getElementById('album-list');
        list.innerHTML = data;  // Insert the HTML directly into the page
    })
    .catch(error => console.error('Error:', error));
