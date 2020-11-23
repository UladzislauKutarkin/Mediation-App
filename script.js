const app= () =>{
    const   song = document.querySelector('.song'),
            play = document.querySelector('.play'),
            outline=document.querySelector('.moving_outline circle'),
            video = document.querySelector('.vid-container video'),
            //Sounds
            sounds = document.querySelectorAll('.sound-picker button'),
            //Time Display
            timeDisplay = document.querySelector('.time-display'),
            //Get the length of the outline
            outlineLength = outline.getTotalLength(),
            timeSelect = document.querySelectorAll('.time-select button');
        //Duration
    let fakeDuration=600;
        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset=outlineLength;
    //pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        })
    })
    //play sound
    play.addEventListener('click', ()=>{
        checkPlaying(song);
    });

    //Select Sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:
            ${Math.floor(fakeDuration % 60)}`;
        })
    })

    //create a func to stop and play the sound
    const checkPlaying = song => {
        if (song.paused) {
            song.play()
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            play.src='./svg/play.svg';
            video.pause();
        }
    };
    // animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;
        if (currentTime >=fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src='./svg/play.svg';
            video.pause();
        }
    };
};

app();