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

const audio = new Audio();
const songNameDisplay = document.getElementById("songName");
const vinylGif = document.getElementById("vinylGif");
const nowPlayingContainer = document.getElementById("nowPlayingContainer");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");

audio.volume = volumeSlider.value;

volumeSlider.addEventListener("input", function () {
    audio.volume = this.value;

    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    this.style.setProperty('--value', percentage + '%');
});

let currentSongIndex = 0;

function playSong(index) {
    currentSongIndex = index;

    audio.src = songs[index].src;
    audio.play();

    songNameDisplay.textContent = songs[index].name;

    nowPlayingContainer.style.display = "flex";
    vinylGif.style.display = "block";
}

audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
});

audio.addEventListener("pause", function () {
    vinylGif.style.display = "none";
});

audio.addEventListener("ended", function () {

    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextSongIndex);
});

const playlistContainer = document.querySelector('.playlist');

function createPlaylist() {
    songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');

        const songText = document.createElement('span');
        songText.textContent = `Yuna | ${song.name}`;

        const playButton = document.createElement('button');
        playButton.textContent = "Play";

        playButton.onclick = function() {
            playSong(index);
        };

        songElement.appendChild(songText);
        songElement.appendChild(playButton);

        playlistContainer.appendChild(songElement);
    });
}

createPlaylist();
