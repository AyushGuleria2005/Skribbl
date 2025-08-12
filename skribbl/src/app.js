const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"https://skribbl-one.vercel.app/",
        methods:["GET","POST"],
        credentials:true
    }
})

io.on("connection",(socket)=>{
    console.log(`Message from id ${socket.id}`);
    socket.on("drawing-server",(obj)=>{
        const {posX,posY} = obj;
        // console.log(posX,posY);
        socket.broadcast.emit("drawing-client",obj)
    })
    socket.on("disconnect",()=>{
        console.log("Canvas Disconnected: "+socket.id);
    })
})

app.use("/",(req,res)=>{
    res.send("Coming soon.............")
})

server.listen(7777,()=>{
    console.log("Server is running at port 7777");
})