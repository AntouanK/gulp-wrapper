// gulp-wrapper
//
//  A plugin used to wrap files with custom strings
var through2 = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

module.exports = function(opt) {
  'use strict';

  if(typeof opt !== 'object'){
    opt = {};
  }

  return through2.obj(function (file, enc, callback) {

    //  check if file is there
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-wrapper',  'Streaming not supported'));
    }

    //  get the file's name
    var fileName = file.path.replace(file.base, '');

    //  normalize windows platform slashes
    if ( process.platform.match(/^win/) ) {
      fileName = fileName.replace(/\\/g, '/');
    }

    var header = !opt.header ?
          '':
          typeof opt.header === 'function' ?
            opt.header( file ) :
            opt.header.replace(/\${filename}/g, fileName),

        footer = !opt.footer ?
          '':
          typeof opt.footer === 'function' ?
            opt.footer( file ) :
            opt.footer.replace(/\${filename}/g, fileName);

    if ( footer || header ) {
      file.contents = new Buffer( header + file.contents.toString() + footer );
    }

    //  push the file into the output
    this.push(file);
    callback();

  });
};
