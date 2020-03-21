var express = require("express");
var app = express();
var express = require("express");
var session = require("cookie-session");

app.use(session({ secret: "messagesHosting", name: "session" }));

let message = "";

app.get("/", function(req, res) {
    res.status(301);
    res.redirect("/message");
    res.end();
});

app.get("/message", function(req, res) {
    let echoMessage = req.session.message || message;
    if (echoMessage) {
        res.setHeader("200", "Content-Type", "text/plain");
        res.status(200);
        if (parseInt(echoMessage)) {
            return setTimeout(() => {
                return res.end(
                    `Message Received: ${echoMessage}; Number detected... Increased response delay by ${echoMessage}ms.`
                );
            }, echoMessage);
        }
        return res.end(`Message Received: ${echoMessage}`);
    }
    res.setHeader("419", "Content-Type", "text/plain");
    res.status(419);
    res.end();
});

app.post("/message/:message", function(req, res) {
    req.session.message = req.params.message;
    message = req.params.message;

    res.status(204);
    res.end();
});

app.get("/memory_usage", function(req, res) {
    res.setHeader("200", "Content-Type", "text/plain");

    let memoryUsage = process.memoryUsage().rss / 1024 / 1024;

    res.end(`The server process is currently using approximately ${Math.round(memoryUsage * 100) / 100} MB`);
});

app.post("/reset", function(req, res) {
    req.session.message = "";

    res.status(204);
    res.end();
});

app.listen(8080, () => console.log("Running at port 8080"));
