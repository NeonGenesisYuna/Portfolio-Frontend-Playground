// Function to fetch and display data
function fetchData(endpoint, elementId) {
    fetch(`/api/proxy?endpoint=${endpoint}`) // Calls the proxy API
        .then(response => response.json()) // Expect JSON response
        .then(data => {
            let list = document.getElementById(elementId);
            list.innerHTML = ""; // Clear previous content

            data.forEach(item => {
                let li = document.createElement("li");
                li.classList.add("song"); // Apply CSS class

                let img = document.createElement("img");
                img.src = item.image;
                img.classList.add("album-cover"); // Add image styling

                let songInfo = document.createElement("div");
                songInfo.classList.add("song-info");

                let songTitle = document.createElement("span");
                songTitle.classList.add("song-title");
                songTitle.textContent = item.name;

                let artistName = document.createElement("span");
                artistName.classList.add("artist-name");
                artistName.textContent = `by ${item.artist}`;

                songInfo.appendChild(songTitle);
                songInfo.appendChild(artistName);
                li.appendChild(img);
                li.appendChild(songInfo);

                list.appendChild(li);
            });
        })
        .catch(error => console.error("Error:", error));
}

// Fetch data for top songs and top artists
fetchData("top-songs", "top-songs-list");
fetchData("top-artists", "top-artists-list");
