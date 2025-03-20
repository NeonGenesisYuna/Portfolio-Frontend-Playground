const songs = [
    { src: "../soundtrack/Layer 1.mp3", name: "Layer 1 (Weird)" },
    { src: "../soundtrack/Layer 2.mp3", name: "Layer 2 (Girls)" },
    { src: "../soundtrack/Layer 3.mp3", name: "Layer 3 (Psyche)" },
    { src: "../soundtrack/Layer 4.mp3", name: "Layer 4 (Religion)" },
    { src: "../soundtrack/Layer 5.mp3", name: "Layer 5 (Distortion)" },
    { src: "../soundtrack/Layer 6.mp3", name: "Layer 6 (Kids)" },
    { src: "../soundtrack/Layer 7.mp3", name: "Layer 7 (Society)" },
    { src: "../soundtrack/Layer 8.mp3", name: "Layer 8 (Rumors)" },
    { src: "../soundtrack/Layer 9.mp3", name: "Layer 9 (Protocol)" },
    { src: "../soundtrack/Layer 10.mp3", name: "Layer 10 (Love)" },
    { src: "../soundtrack/Layer 11.mp3", name: "Layer 11 (Infornography)" },
    { src: "../soundtrack/Layer 12.mp3", name: "Layer 12 (Landscape)" },
    { src: "../soundtrack/Layer 13.mp3", name: "Layer 13 (Ego)" }
];

// Create an audio element
const audio = new Audio();
const songNameDisplay = document.getElementById("songName");
const vinylGif = document.getElementById("vinylGif");
const nowPlayingContainer = document.getElementById("nowPlayingContainer");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");

// Set initial volume
audio.volume = volumeSlider.value;

// Update volume and the slider's gradient fill when changed
volumeSlider.addEventListener("input", function () {
    audio.volume = this.value;
    // Calculate the percentage of the slider value
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    // Update the CSS variable for the background gradient
    this.style.setProperty('--value', percentage + '%');
});

// Global variable to track the current song index
let currentSongIndex = 0;

function playSong(index) {
    currentSongIndex = index;
    // Set the audio source and play the song
    audio.src = songs[index].src;
    audio.play();

    // Update the song name display with the current song's name
    songNameDisplay.textContent = songs[index].name;

    // Show the "Now Playing" UI (vinyl, song info, slider)
    nowPlayingContainer.style.display = "flex";
    vinylGif.style.display = "block"; // Ensures the vinyl gif is visible
}

// Update progress bar as the song plays
audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
});

// Optionally hide vinyl when the song is paused
audio.addEventListener("pause", function () {
    vinylGif.style.display = "none";
});

// Autoplay the next song when the current one ends
audio.addEventListener("ended", function () {
    // Calculate the next song index, looping back to 0 if at the end
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextSongIndex);
});

// Get the playlist container from the DOM
const playlistContainer = document.querySelector('.playlist');

// Function to create and display songs dynamically
function createPlaylist() {
    songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');

        const songText = document.createElement('span');
        songText.textContent = `Yuna | ${song.name}`;

        const playButton = document.createElement('button');
        playButton.textContent = "Play";

        // Set the onclick event for the play button
        playButton.onclick = function() {
            playSong(index);  // Play the song by its index
        };

        // Append the song text and button to the songElement
        songElement.appendChild(songText);
        songElement.appendChild(playButton);

        // Append the songElement to the playlist container
        playlistContainer.appendChild(songElement);
    });
}

// Call the function to create the playlist when the page loads
createPlaylist();
