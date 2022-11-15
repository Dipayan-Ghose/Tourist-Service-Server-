const express = require("express");
const app= express();
const port= process.env.PORT || 5000;
var cors= require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Tourist service api is running');
});




app.listen(port, ()=>{
    console.log("Tourist server api is running");
});