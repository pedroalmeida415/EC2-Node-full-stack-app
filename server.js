var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io").listen(server),
    ent = require("ent"),
    fs = require("fs"),
    session = require("cookie-session");

app.use(session({ secret: "messagesHosting", name: "session" }));

let message = "";

app.use("/styles", express.static(__dirname + "/styles"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
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

    io.emit("message", message);
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
    message = "";

    res.status(204);
    res.end();
});

app.get("/live", function(req, res) {
    res.sendFile(__dirname + "/live.html");
});

app.use(function(req, res, next) {
    res.setHeader("404", "Content-Type", "text/plain");
    res.status(404).send("Sorry, this page doesn't exists!");
    res.end();
});

io.sockets.on("connection", function(socket) {
    socket.on("message", function(message) {
        message = ent.encode(message);
        socket.broadcast.emit("message", { message: message });
    });
    io.emit("message", message);
});

server.listen(8080, () => console.log("Running on port 8080"));
