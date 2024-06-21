if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const router = require("./routers");
const cors = require("cors");
const port = process.env.PORT || 3000;
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://gp2.nfadhilahe.online",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://gp2.nfadhilahe.online",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

io.on("connection", (socket) => {
  //send ke semua connected user, me yg isinya socket id
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  //kalo ada yg init calluser, server nerima data ini
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    //emit ke org yg mau di call, isinya signal sm info penelpon
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  //kalo ada yg aswercall
  socket.on("answerCall", (data) => {
    //dia ngirim signal data ke caller
    //data.to adalah yg
    io.to(data.to).emit("callAccepted", data.signal);
  });

  if (socket.handshake.auth) {
    console.log("fullName : " + socket.handshake.auth.fullName);
  }

  socket.on("message:new", (message) => {
    io.emit("message:update", {
      from: socket.handshake.auth.fullName,
      message,
    });
  });
});

server.listen(port, () => console.log("server is running on port", port));
