var express = require("express");
var app = express();
var express = require("express");
var session = require("cookie-session");

app.use(session({ secret: "messagesHosting", name: "session" }));

app.get("/message", function(req, res) {
    let message = req.session.message;
    if (message) {
        res.setHeader("200", "Content-Type", "text/plain");
        res.status(200);
        if (parseInt(message)) {
            return setTimeout(() => {
                return res.end(
                    `Message Received: ${message}; Number detected... Increased response delay by ${message}ms.`
                );
            }, message);
        }
        return res.end(`Message Received: ${message}`);
    }
    res.setHeader("419", "Content-Type", "text/plain");
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
