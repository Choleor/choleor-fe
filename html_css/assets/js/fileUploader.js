//file input

var customFile = document.querySelector('#customFile');
customFile.addEventListener('change', updateFileUploadDisplay);

function updateFileUploadDisplay() {
    var curFiles = customFile.files;
    if(curFiles.length == 0) fileName.textContent = 'Choose file (.mp3, .opus, .webm, .wav)'
    else {
        for(const file of curFiles) {
            if(validFileType(file)){
                if(file.size > 10485760) {
                    document.querySelector('#file-name').textContent = file.name+' : Please use less than 10MB files.';
                }
                else {
                    document.querySelector('#file-name').textContent = file.name;
                    $("#file-upload").css("pointer-events", "auto");
                    $("#file-upload").css("opacity", "1");
                }
            }
            else {
                document.querySelector('#file-name').textContent = file.name+' : Not a valid file type.';
            }
        }
    }
}

const fileTypes = [
    "audio/wav"
]

function validFileType(file) {
    return fileTypes.includes(file.type);
}