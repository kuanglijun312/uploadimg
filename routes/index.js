var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs')
  , gm = require('gm');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
      res.json({success: true});
    });
    form.on('file', function(name, file) {
      var dir = 'klj--------dir'
      fs.existsSync(dir) || fs.mkdirSync(dir);
      
    	gm(file.path)
        .resize(900)
        .noProfile()
        .write(dir+'/'+file.name, function (err) {
          if (!err) console.log('done');
        });
	});
});

module.exports = router;
