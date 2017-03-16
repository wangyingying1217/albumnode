var express = require("express");
var app = express();
var router = require("./Controller/router");

app.set("view engine","ejs")

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.getAlbumName);
app.get("/:albumName",router.getAlbumPicList);
app.get("/up",router.showUp);
app.post("/up",router.doPost);

app.use(function (req,res) {
  res.render("404")
});
app.listen(3000);