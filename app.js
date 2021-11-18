const express = require('express');
const router = require("./routes/route");
const mongoose = require("mongoose");
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require("fs");
require("dotenv").config({path:"variables.env"});


const httpsServerOptions = {
    key : fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
}



const app = express();

const PORT = process.env.PORT || 9000

const PORT_HTTP = process.env.PORT_HTTP;
const PORT_HTTPS = process.env.PORT_HTTPS;



app.use((req,res,next) => {
    if(req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`)
})


app.use(cors());



// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.db_URL,
 { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("connected to the database"));

//Habilitar inputs
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//habilita archivos publicos (imagenes)}
app.use(express.static("uploads"));

//rutas
app.use(router());

// activar servidor

const serverHttp = http.createServer(app);
serverHttp.listen(PORT_HTTP);


const serverHttps = https.createServer(httpsServerOptions,app);
serverHttps.listen(PORT_HTTPS);

// app.listen(PORT,()=>{
//     console.log(`Active server on port ${PORT}`)
// })