const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer( (req, res) => {

    let filepath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

    let extname = path.extname(filepath);

    let contentType = "text/html";

    switch (extname) {
        case ".js":
            contentType = "text/javaScript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        default:
            break;
    }

    fs.readFile(filepath, (err, content) => {
        if(err){
            if(err.code == "ENOENT"){
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                    if(err) throw err;
                    res.writeHead(200, { "Content-Type": "text/html"});
                    res.end(content, "utf8");
                });
            }
            else{
                res.write(500);
                res.end(`Server Error: ${err.code}`);
            } 
        }else{
            res.writeHead(200, { "Content-Type": contentType});
            res.end(content, "utf8");
        }
        
    });

});

var PORT = process.env.PORT || 5500;
server.listen(PORT, () => { console.log(`Server running on PORT ${PORT}.....`); });