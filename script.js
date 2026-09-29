// Get HTML elements

const audio = document.getElementById("audio");

const playButton = document.getElementById("play");

const previousButton = document.getElementById("previous");

const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");


// Song information

const songs = [
    {
        title: "My Song",
        artist: "My Artist",
        file: "music/song1.mp3"
    }
];


// Current song

let songIndex = 0;


// Load song

function loadSong() {

    const song = songs[songIndex];

    document.getElementById("song-title").textContent = song.title;

    document.getElementById("artist").textContent = song.artist;

    audio.src = song.file;

    audio.load();
}


// Play song

function playSong() {

    audio.play()
        .then(function() {

            playButton.textContent = "⏸";

        })
        .catch(function(error) {

            console.log("Audio could not play:", error);

            alert("The MP3 file could not be played. Check that music/song1.mp3 exists.");

        });
}


// Pause song

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";
}


// Play / Pause

playButton.addEventListener("click", function() {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// Previous button

previousButton.addEventListener("click", function() {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong();

    playSong();

});


// Next button

nextButton.addEventListener("click", function() {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong();

    playSong();

});


// Update progress bar

audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// Show total duration

audio.addEventListener("loadedmetadata", function() {

    duration.textContent =
        formatTime(audio.duration);

});


// Change song position

progress.addEventListener("input", function() {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// Volume control

volume.addEventListener("input", function() {

    audio.volume = volume.value;

});


// Automatically play again when song ends

audio.addEventListener("ended", function() {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong();

    playSong();

});


// Convert seconds into minutes and seconds

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60);

    return minutes + ":" +
        (secondsPart < 10 ? "0" : "") +
        secondsPart;
}


// Load the first song

loadSong();