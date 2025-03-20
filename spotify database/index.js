function fetchData(endpoint, elementId) {
    fetch(`https://portfolio-frontend-playground.vercel.app/spotify%20database/${endpoint}`)
        .then(response => {
            console.log('Response:', response);  // Log the full response
            return response.text();  // Read as text first to inspect the raw response
        })
        .then(text => {
            console.log('Response Text:', text);  // Log the raw text response
            try {
                const data = JSON.parse(text);  // Try parsing it to JSON
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
            } catch (error) {
                console.error("Error loading data:", error);
                document.getElementById(elementId).innerHTML = "<p>Failed to load data.</p>";
            }
        })
        .catch(error => {
            console.error("Error loading data:", error);
            document.getElementById(elementId).innerHTML = "<p>Failed to load data.</p>";
        });
}

// Fetch top songs and top artists
fetchData("top-songs", "top-songs-list");
fetchData("top-artists", "top-artists-list");
     