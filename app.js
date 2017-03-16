var express = require("express");
var router = require("./Controller/router");
var app = express();

app.use(express.static("./public"));

app.get("/",router.getAlbumName);
app.listen(3000);