let previousSong = document.querySelector(".song_control-previous")
let playButton = document.querySelector(".song_control-play")
let nextSong = document.querySelector(".song_control-next")
let imageSong = document.querySelector(".cover")
let titleSong = document.querySelector(".song_title")
let artistSong = document.querySelector(".song_singer")
let audio = document.querySelector(".audio")
let controlTime = document.querySelector(".rangeControl")
let playedTime = document.querySelector('.song_time-now')
let totalTime = document.querySelector('.song_time-total')
let isPlay = false;


let songList = [
    {
        title: "Dreams",
        artist: "Benjamin Tissot",
        image: "covers/1.jpg",
        location: "tracks/bensound-dreams.mp3"
    },
    {
        title: "Endless Motion",
        artist: "Ben Tissot",
        image: "covers/2.jpg",
        location: "tracks/bensound-endlessmotion.mp3"
    },
    {
        title: "Once Again",
        artist: "Bensound",
        image: "covers/3.jpg",
        location: "tracks/bensound-onceagain.mp3"
    },
    {
        title: "Perception",
        artist: "Bensound",
        image: "covers/4.jpg",
        location: "tracks/bensound-perception.mp3"
    },
    {
        title: "Tenderness",
        artist: "Ben Tissot",
        image: "covers/5.jpg",
        location: "tracks/bensound-tenderness.mp3"
    }
];


let indexInit = 0

function loadSong(index) {
    titleSong.innerText = songList[index].title;
    artistSong.innerText = songList[index].artist;
    imageSong.src = songList[index].image;
    audio.src = songList[index].location
    playSong()
}

function playSong() {
    if (!isPlay) {
        playButton.querySelector("i.fas").classList.remove("fa-play");
        playButton.querySelector("i.fas").classList.add("fa-pause");
        isPlay = true;
        audio.play();
        imageSong.classList.add("spinning")
    } else {
        playButton.querySelector("i.fas").classList.remove("fa-pause");
        playButton.querySelector("i.fas").classList.add("fa-play");
        isPlay = false;
        audio.pause();
        imageSong.classList.remove("spinning")
    }
}

playButton.addEventListener("click", function() {playSong(indexInit)});

function tonextSong() {
    if (indexInit < songList.length - 1) {
        indexInit += 1;
    } else {indexInit = 0}
    isPlay = !isPlay;
    loadSong(indexInit)
}

nextSong.addEventListener("click", tonextSong)

previousSong.addEventListener("click", function() {
    if (indexInit === 0) {
        indexInit = songList.length - 1
    } else {indexInit -= 1;}
    isPlay = !isPlay;
    loadSong(indexInit)
})

audio.onloadeddata = function () {
    controlTime.max = audio.duration
    let songMinutes = Math.floor(audio.duration / 60)
    songMinutes = (songMinutes >= 10) ? songMinutes : "0" + songMinutes
    let songSeconds = Math.floor(audio.duration % 60)
    songSeconds = (songSeconds >= 10) ? songSeconds : "0" + songSeconds

    totalTime.innerHTML = songMinutes + ':' + songSeconds
}

audio.ontimeupdate = function () {
    controlTime.value = audio.currentTime
    if (audio.currentTime === audio.duration) {
        tonextSong()
    }
}

controlTime.oninput = function () {
    audio.currentTime = controlTime.value }

audio.addEventListener('timeupdate', function () {
    let playedMinutes = Math.floor(audio.currentTime / 60)
    playedMinutes = (playedMinutes >= 10) ? playedMinutes : "0" + playedMinutes
    let playedSeconds = Math.floor(audio.currentTime % 60)
    playedSeconds = (playedSeconds >= 10) ? playedSeconds : "0" + playedSeconds

    playedTime.innerHTML = playedMinutes + ':' + playedSeconds
}, false)