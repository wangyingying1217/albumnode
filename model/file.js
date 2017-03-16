/**
 * Created by Administrator on 2017-03-16.
 */
var fs = require("fs");
var path = require("path");
exports.getAllAibunName = getAllAibunName;
exports.getAllAlbumPicList = getAllAlbumPicList;

function getAllAibunName(callback) {
  fs.readdir(path.normalize(__dirname + "/../uploads"), function (err, files) {
    if(err){
      callback(err,null);
    }
    var folder = [];
    (function iterator(i) {
      if (i == files.length) {
        callback(null,folder);
        return;
      }
      fs.stat(path.normalize(__dirname + "/../uploads/"+ files[i]), function (err, stats) {
        if(err){
          callback(err,null);
          return;
        }
        if (stats.isDirectory()) {
          folder.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0);
  })
}

function getAllAlbumPicList(fileName,callback) {
  fs.readdir(path.normalize(__dirname + "/../uploads/"+fileName), function (err, files) {
    if(err){
      callback(err,null);
      return;
    }
    var fileList = [];
    (function iterator(i) {
      if (i == files.length) {
        callback(null,fileList);
        return;
      }
      fs.stat(path.normalize(__dirname + "/../uploads/"+fileName+"/" + files[i]), function (err, stats) {
        if(err){
          callback(err,null);
          return;
        }
        if (stats.isFile()) {
          fileList.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0);
  })
}