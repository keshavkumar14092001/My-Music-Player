const musicAudio = document.querySelector('#audio');
const musicContainer = document.querySelector('.mainContainer');
const songTitle = ['hey', 'summer', 'ukulele', 'Namo Namo', 'Lehra Do', 'Ranjha', 'Dil ke chain', 'Taaron'];
const musicName = document.querySelector('.musicName');
const pervButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const playButton = document.querySelector('#play');
const progressContainer = document.querySelector('.progressBar');
const progress = document.querySelector('.progress');
const rotatingWheel = document.querySelector('.leftContainer');

// Keeping track of songs:
let songIndex = 2;

// All the required function:

function playMusic(song) {
    musicName.innerText = song;
    musicAudio.src = `music/${song}.mp3`;
}

function playSong() {
    musicContainer.classList.add('play');
    playButton.innerText = '||';
    // Playing the Audio:
    musicAudio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.innerText = 'O';
    // Pausing the Audio:
    musicAudio.pause()
}

function pervSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songTitle.length - 1;
    }
    playMusic(songTitle[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > (songTitle.length - 1)) {
        songIndex = 0;
    }
    playMusic(songTitle[songIndex]);
    playSong();
}

function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    let progressReport = (currentTime / duration) * 100;
    progress.style.width = `${progressReport}%`
}

function changeProgressBar(e) {
    const click = e.offsetX;
    const duration = musicAudio.duration;
    const width = this.clientWidth;
    musicAudio.currentTime = (click / width) * duration;
}

// Adding Eventlistener to the play button:
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
});

// Changing Songs:

pervButton.addEventListener('click', () => {
    pervSong();
});

nextButton.addEventListener('click', () => {
    nextSong();
});

// Logic Related to Progress Bar:
musicAudio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', changeProgressBar);

// Playing Next Song when running Song gets ended:
musicAudio.addEventListener('ended', nextSong);