// audio 구간 재생
  
//audioFile = new Audio();
//audioFile.src = localStorage.getItem("audio_url")


function audioPlay() {
    audioFile.src = path;
    audioFile.currentTime = start_end[0];

    document.getElementById("audioButtonImg").className = "fas fa-pause fa-2x ml-1";
    document.getElementById("audioButton").setAttribute("onClick", "audioPause()");

    audioFile.play();
}

function audioPause() {
    audioFile.pause();

    document.getElementById("audioButtonImg").className = "fas fa-play fa-2x ml-2";
    document.getElementById("audioButton").setAttribute("onClick", "audioPlay()");
}

audioFile.addEventListener("timeupdate", function(){
    if(audioFile.currentTime >= start_end[1]) {
        audioFile.pause();
    }
}, false);

$(document).ready(function () {
    console.log(duration);
    console.log(path);

    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barWidth: 3,
        waveColor : '#44476A',
        progressColor : '#44476A'
    })

    let path = localStorage.getItem("audio_id")+".wav"
    wavesurfer.load(path);

    let audio = new Audio();
    audio.src = path;
})