
//const { get } = require("jquery");

//const { rawListeners } = require("gulp");

//const proxyurl = "https://cors-anywhere.herokuapp.com/";

var status;
var url_header = 'http://172.20.10.2:8000';

var start_end = [0, 0]
var downloadUrl = 'audio.wav';
var audio_file = new Audio;

var audio_path = localStorage.getItem("audio_path");
var audio_id = localStorage.getItem("audio_id");
var duration = localStorage.getItem("duration");

var user_id = localStorage.getItem("user_id");
var interval_number = localStorage.getItem("interval_number");

var choreo_id = [["",""],["",""],["",""],["",""],["",""],["",""]];

const ctx = new AudioContext();
let audio;

function downloadFile(data, filename, mime) {
    const blob = new Blob([data], {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(blob, filename);
      return;
    }

    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 100);
}

function post_youtubeUrl(){
    const url = url_header+'/audio/youtube';

    const youtubeUrl = document.getElementById('exampleInputIcon2').value;
    const data ={
        "url" : youtubeUrl
    }

    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
    .then(res => {
        localStorage.setItem("duration", res.headers.get('duration'));
        localStorage.setItem("audio_id", res.headers.get('audio_id'));
        localStorage.setItem("status", res.status);

        return res.blob();
    })
    .then(data => {
        if(localStorage.getItem("status") == 200){
            let audio_id = localStorage.getItem("audio_id");
            localStorage.setItem("audio_path", "/home/songjh/Downloads/"+audio_id+".wav");
            downloadFile(data, audio_id+'.wav', 'audio/wav');

            $("#next-button").css("opacity", "1");
            $("#next-button").css("pointer-events", "auto");
        }
        else{
            alert(res.message);
        }
    })
    .catch(function(err) {
        console.log("Fetch Error", err);
    })
}

function post_musicFile(){
    const url = url_header+'/audio/file';
    var formData = new FormData();
    var fileField = document.querySelector('#customFile');

    formData.append("file", fileField.files[0]);

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(res => {
        localStorage.setItem("duration", res.headers.get('duration'));
        localStorage.setItem("audio_id", res.headers.get('audio_id'));
        localStorage.setItem("status", res.status);

        return res.blob();
    })
    .then(data => {
        if(localStorage.getItem("status") == 200){
            let audio_id = localStorage.getItem("audio_id");
            localStorage.setItem("audio_path", "/home/songjh/Downloads/"+audio_id+".wav");
            downloadFile(data, audio_id+'.wav', 'audio/wav');

            $("#next-button").css("opacity", "1");
            $("#next-button").css("pointer-events", "auto");
            console.log("a");
        }
        else{
            alert(res.message);
        }
        console.log("b");
    })
    .catch(function(err) {
        console.log("Fetch Error", err);
    })
    console.log("c");
}

function post_interver_sec(){
    const url = url_header+'/audio/interval';
    const data ={
        "audio_id" : localStorage.getItem("audio_id"),
        "start" : start_end[0],
        "end" : start_end[1]
    }

    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        localStorage.setItem("user_id", json.user_id);
        localStorage.setItem("interval_number", json.interval_number);

        location.href = "choreo-select.html"
    })
    .catch(function(err) {
        console.log("Fetch Error", err);
    })
}

function get_thumbnails(counter, request_n){
    console.log("thumbnail");
    const url = url_header+'/choreo/thumbnail';
    const data ={
        "user_id" : localStorage.getItem("user_id"),
        "counter" : counter,
        "request_n": request_n+1
    }
    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.blob())
    .then(data => {
        const blob = new Blob([data], {type: 'image/png' || 'application/octet-stream'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, 'thumbnail_'+counter+'_'+request_n+'.png');
            return;
        }

        const blobURL = window.URL.createObjectURL(blob);
        console.log(blobURL+' thumbnail');

        document.getElementsByClassName("thumbnail")[request_n].src = blobURL;
    })
    .catch(function(err) {
        console.log("Fetch Error", err);
    })
}

function get_videos(selected_choreo_id, counter, request_n, remark){
    console.log("video");
    $(".spinner").css("opacity", "1");
    if(choreo_id[request_n][0] != ""){
        document.getElementById("choreo_select_vid").setAttribute('src', choreo_id[request_n][1]);
        return
    }

    const url = url_header+'/choreo/video';
    const data = {
        "user_id": localStorage.getItem("user_id"),
        "selected_choreo_id": selected_choreo_id,
        "counter": counter,
        "remark":  remark,
        "request_n": request_n+1
    }

    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        choreo_id[request_n][0] = res.headers.get("choreo_id");
        return res.blob()
    })
    .then(data => {
        const blob = new Blob([data], {type: 'video/mp4' || 'application/octet-stream'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, 'video_'+counter+'_'+request_n+'.mp4');
            return;
        }

        const blobURL = window.URL.createObjectURL(blob);
        console.log(blobURL+' video');

        choreo_id[request_n][1] = blobURL;
        if (request_n == 0){
            document.getElementById("choreo_select_vid").setAttribute('src', blobURL);
            $(".spinner").css("opacity", "0");
        }
    })
    .catch(function(err) {
        console.log("Fetch Error", err);
    })
}

function get_merge_product(selected_choreo_id){
    const url = url_header+'/product/merge';
    const data = {
        "user_id": localStorage.getItem("user_id"),
        "selected_choreo_id": selected_choreo_id
    }

    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.blob())
    .then(data => {
        const blob = new Blob([data], {type: 'video/mp4' || 'application/octet-stream'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, 'video_'+counter+'_'+request_n+'.mp4');
            return;
        }

        const blobURL = window.URL.createObjectURL(blob);

        document.getElementById("choreo_select_vid").setAttribute('src', blobURL);
    })

}

function get_final_product(/*selected_choreo_id*/){
    const url = url_header+'/product/final';
    const data = {
        "user_id": localStorage.getItem("user_id"),
        //"selected_choreo_id": selected_choreo_ids
    }

    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.blob();
    })
    .then(data => {
        const blob = new Blob([data], {type: 'video/mp4' || 'application/octet-stream'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, 'final_'+counter+'_'+request_n+'.mp4');
            return;
        }

        const blobURL = window.URL.createObjectURL(blob);
        
        $("#downloadButton").css("pointer-events", "auto");
        $("#downloadButton").css("opacity", "1");
        
        $(".spinner").css("opacity", "0");

        document.getElementById("result_video").setAttribute('src', blobURL);
        document.getElementById("downloadButton").setAttribute('href', blobURL);
    })
}