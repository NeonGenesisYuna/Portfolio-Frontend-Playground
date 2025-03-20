function fetchData(endpoint, elementId) {
    fetch(`/api/proxy?endpoint=${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Expect JSON response
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Invalid JSON format");
            }

            let list = document.getElementById(elementId);
            list.innerHTML = ""; // Clear previous content

            data.forEach(item => {
                let li = document.createElement("li");
                li.classList.add("song");

                let img = document.createElement("img");
                img.src = item.image;
                img.classList.add("album-cover");

                let songInfo = document.createElement("div");
                songInfo.classList.add("song-info");

                let songTitle = document.createElement("span");
                songTitle.classList.add("song-title");
                songTitle.textContent = item.name;

                let artistName = document.createElement("span");
                artistName.classList.add("artist-name");
                artistName.textContent = `by ${item.artist || "Unknown"}`;

                songInfo.appendChild(songTitle);
                songInfo.appendChild(artistName);
                li.appendChild(img);
                li.appendChild(songInfo);

                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error loading data:", error);
            document.getElementById(elementId).innerHTML = `<p>Failed to load data: ${error.message}</p>`;
        });
}

// Fetch top songs and top artists
fetchData("top-songs", "top-songs-list");
fetchData("top-artists", "top-artists-list");
