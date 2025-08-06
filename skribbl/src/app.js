const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})

io.on("connection",(socket)=>{
    console.log(`Message from id ${socket.id}`);
    socket.on("drawing",(obj)=>{
        // console.log(obj)
        console.log(obj.x,obj.y);
    })
})

app.use("/",(req,res)=>{
    res.send("Coming soon.............")
})

server.listen(7777,()=>{
    console.log("Server is running at port 7777");
})