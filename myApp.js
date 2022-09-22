require("dotenv").config();
let bodyParser=require("body-parser");
let express = require('express');
let app = express();
//console.log("Hello World");
app.get("/",function (req, res) {
        res.sendFile(__dirname+"/views/index.html");
    });
app.use("/", (req, res,next)=>{
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
});
app.use("/public",express.static(__dirname+"/public"));

//necessary for bodyParser to work https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/json",(req,res)=>{ 
    let message = {"message": "Hello json"};
    if (process.env.MESSAGE_STYLE==="uppercase")
        message.message= message.message.toUpperCase();
    res.json(message);
});
app.get("/now",(req,res,next)=>{
    req.time=new Date().toString();
    next();
}, (req,res)=>{
    res.send({"time":req.time});
});
app.get("/:word/echo",(req,res)=>
    res.send({"echo":req.params.word})
);
app.get("/name",(req,res,next)=>(
    res.send({"name": `${req.query.first} ${req.query.last}`})
));































 module.exports = app;
