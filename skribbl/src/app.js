const express = require('express');
const app = express();

app.use("/",(req,res)=>{
    res.send("Coming soon.............")
})

app.listen(7777,()=>{
    console.log("Server is running at port 7777");
})