var curr = 0;
var selected_choreo = 0;
var remark = 0;


function nextPage(){
    curr++;
    
    document.querySelector('#currPage').innerHTML = curr+1;
    choreoChoiceStatus()

    for(var i=0; i<6; i++){
        get_videos(choreo_id[selected_choreo][0], curr+1, i, remark);
        get_thumbnails(curr+1, i);
    }

    selected_choreo = 0;
    choreo_id = [["",""],["",""],["",""],["",""],["",""],["",""]];
    
}

function beforePage(){
    curr--;
    
    document.querySelector('#currPage').innerHTML = curr+1;
    choreoChoiceStatus()

    for(var i=0; i<6; i++){
        get_videos('이전에 선택된 choreo_id', curr+1, i, remark);
        get_thumbnails(curr+1, i);
    }

    selected_choreo = 0;
    choreo_id = [["",""],["",""],["",""],["",""],["",""],["",""]];
}

function video_btn_clicked(btn_num){
    document.getElementById("choreo_select_vid").setAttribute('src', choreo_id[btn_num][1]);
    selected_choreo = btn_num;
}

function choreoChoiceStatus(){
    if(curr == 0) {
        $("#before-page").css("pointer-events", "none");
        $("#before-page").css("opacity", "0.2");

        $("#next-button").css("pointer-events", "none");
        $("#next-button").css("opacity", "0.4");
        remark = 1;
    }
    else if(curr == interval_number - 1) {
        $("#next-page").css("pointer-events", "none");
        $("#next-page").css("opacity", "0.2");

        $("#next-button").css("pointer-events", "auto");
        $("#next-button").css("opacity", "1");
        remark = 1;
    }
    else {
        $("#before-page").css("pointer-events", "auto");
        $("#next-page").css("pointer-events", "auto");

        $("#before-page").css("opacity", "1");
        $("#next-page").css("opacity", "1");

        $("#next-button").css("pointer-events", "none");
        $("#next-button").css("opacity", "0.4");
        remark = 0;
    }
}

function mergeButton(){
    get_merge_product(choreo_id[selected_choreo][0]);
}

function nextButton(){
    localStorage.setItem("final_selected_choreo", choreo_id[selected_choreo][0]);

    location.href = "result-download.html";
}

$(document).ready(function () {
    document.querySelector('#currPage').innerHTML = 1;
    document.querySelector('#intervalNum').innerHTML = interval_number;

    for(var i=0; i<6; i++){
        get_videos("X", 0+1, i, 1);
        get_thumbnails(0+1, i);
    }    
});