/**
 * Created by Administrator on 2017-03-16.
 */
var file = require("../model/file");
var formidable = require('formidable');
var sd = require("silly-datetime");
var path = require("path");
var fs = require("fs");

exports.getAlbumName = getAlbumName;
exports.getAlbumPicList = getAlbumPicList;
exports.showUp = showUp;
exports.doPost = doPost;


function getAlbumName(req, res, next) {
  file.getAllAibunName(function (err, folder) {
    if (err) {
      next();
      return;
    }
    res.render("album", {albunName: folder});
  })
}

function getAlbumPicList(req, res, next) {
  var fileName = req.params.albumName;
  file.getAllAlbumPicList(fileName, function (err, fileList) {
    if (err) {
      next();
      return;
    }
    res.render("list", {"albunName": fileName, "picList": fileList})
  })
}
function showUp(req, res) {
  file.getAllAibunName(function (err, folder) {
    if (err) {
      next();
      return;
    }
    res.render("fileUp", {albumName: folder});
  })
}
function doPost(req, res) {
  if (req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempup");

    form.parse(req, function (err, fields, files, next) {
      if (err) {
        next();     //这个中间件不受理这个请求了，往下走
        return;
      }
      if (files.img.size > 2000000) {
        res.send("图片尺寸应该小于2M");
        fs.unlink(files.img.path);
      }
      var time = sd.format(new Date(), 'YYYYMMDDHHmmss');
      var ran = parseInt(Math.random() * 8999 + 1000);
      var extname = path.extname(files.img.name);

      var wenjianjia = fields.albumName;
      var oldpath = files.img.path;
      var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + time +  ran + extname)
      fs.rename(oldpath, newpath, function (err) {
        if (err) {
          res.send("改名失败");
          return;
        }
        res.send("成功");
      });
    });
    return;
  }
}
