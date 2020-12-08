var http = require("http");
var fs = require('fs');
const app = express()

app.use('/css', express.static('./html_css/css'))
app.use('/js', express.static('./html_css/assets/js'))

function send404Message(response){
    response.writeHead(404, {"Content-Type":"text/plain"});
    response.write("404 ERROR");
    response.end();
}

function onRequest(request, response){
    if(request.method == 'GET' && request.url == '/'){
        response.writeHead(200,{"Content-Type":"text/html"});
        fs.createReadStream("./html/choleor/music-select.html").pipe(response);
    }
    else {
        send404Message(response)
    }
}

http.createServer(onRequest).listen(8888);
console.log("Server Created...");