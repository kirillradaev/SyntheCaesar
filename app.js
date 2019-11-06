require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/main.js");
const secureRoutes = require("./routes/secure.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const uri = process.env.MONGO_CONNECTION_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("error", error => {
  console.log("ON connection error", error);
  process.exit(1);
});
mongoose.connection.on("connected", function() {
  console.log("connected to mongo");
});

const app = express();

const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const players = {};
const rooms = {};
const queue = [];

const findPlayer2 = function(socket) {
    if (queue.length > 0) {
        const p2 = queue.pop();
        const room = socket.id + '#' + p2.id;

        p2.join(room);
        socket.join(room);

        rooms[p2.id] = room;
        room[socket.id] = room;

        socket.emit('ready', { msg: 'Ready to Start Your Game!' });
        p2.emit('ready', { msg: 'Ready to Start Your Game!' });

    } else {

        queue.push(socket);

        socket.emit('waiting', { msg: 'Waiting for another player' });
    }
}

io.on('connection', function (socket) {

    players[socket.id] = {
        playerId: socket.id,
        score: 0
    };
    
    findPlayer2(socket);

    socket.on('scoreUpdate', function(score) {
        players[socket.id].score = score
        socket.broadcast.emit('playerScore', theirScore = players[socket.id].score)
    });

    socket.on('leave room', function () {
        const room = rooms[socket.id];
        socket.broadcast.to(room).emit('game end');
        const p2Id = room.split('#');
        p2Id = p2Id[0] === socket.id ? p2Id[1] : p2Id[0];

        findPlayer2(players[p2Id]);
        findPlayer2(socket);
    })

    socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
        delete players[socket.id];
        io.emit('disconnect', socket.id);
    });

})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

require("./auth/auth.js");

app.get(
  "/game.html",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.sendFile(__dirname + "/public/game.html");
  }
);

app.use(express.static(__dirname + "/public"));

app.get("/login", function(req, res) {
  res.redirect("/login.html");
});

// app.post("/logout", (req, res) => {
//   res.clearCookie("sessionUserID");
//   res.clearCookie("Created");
//   res.redirect("/");
// });

app.get("/about", (req, res) => {
  res.redirect("/about.html");
});

app.get("/howto", (req, res) => {
  res.redirect("/howTo.html");
});

app.get("/play", (req, res) => {
  res.redirect("/game.html");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use("/", routes);
app.use("/", passport.authenticate("jwt", { session: false }), secureRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "404 - Not Found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
