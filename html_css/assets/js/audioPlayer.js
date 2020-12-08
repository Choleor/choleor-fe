// audio 구간 재생
var duration
var wavesurfer

$(document).ready(function () {
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barWidth: 3,
        waveColor : '#44476A',
        progressColor : '#44476A'
    })

    let path = localStorage.getItem("audio_id")+".wav"
    wavesurfer.load(path)

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
})

function audioPlay() {

    document.getElementById("audioButtonImg").className = "fas fa-pause fa-2x ml-1";
    document.getElementById("audioButton").setAttribute("onClick", "audioPause()");

    wavesurfer.play([start_end[0]],[start_end[1]]);
}

function audioPause() {
    wavesurfer.pause();

    document.getElementById("audioButtonImg").className = "fas fa-play fa-2x ml-2";
    document.getElementById("audioButton").setAttribute("onClick", "audioPlay()");
}