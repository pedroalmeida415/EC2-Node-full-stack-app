var express = require("express");
var app = express();
var url = require("url");
var express = require("express");
var session = require("cookie-session"); // Loads the piece of middleware for sessions
var bodyParser = require("body-parser"); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(session({ secret: "messagesHosting", name: "session" }));
app.use(urlencodedParser);

app.get("/message", function(req, res) {
    res.setHeader("200", "Content-Type", "text/plain");
    let message = req.session.message;
    if (message) {
        console.log(req.session.message);
        if (parseInt(message)) {
            return setTimeout(() => {
                return res.end(
                    `Message Received: ${message}; Number detected... Increased response delay by ${message}ms.`
                );
            }, message);
        }
        return res.end(`Message Received: ${message}`);
    }
    res.status(419);
    res.end();
});

app.post("/message/", function(req, res) {
    req.session.message = "";

    res.status(204);
    res.end();
});

app.post("/message/:message", function(req, res) {
    req.session.message = req.params.message;

    res.status(204);
    res.end();
});

app.get("/memory_usage", function(req, res) {
    res.setHeader("200", "Content-Type", "text/plain");

    let memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

    res.end(`The script uses approximately ${Math.round(memoryUsage * 100) / 100} MB`);
});

app.post("/reset", function(req, res) {
    req.session.message = "";

    res.status(204);
    res.end();
});

app.listen(8080, () => console.log("Running at http://localhost:8080"));
