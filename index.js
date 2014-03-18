
// gulp-wrapper

'use strict';

var through2    = require('through2');

module.exports = function(opt) {

	opt.header = opt.header || '';
	opt.footer = opt.footer || '';

	return through2.obj(function (file, enc, callback) {

		var fileName = file.path.replace(file.base,''),
			//	set the new contents
			newContentString = file.contents.toString(),
			//	make a new buffer
			buf;

		opt.header = opt.header.replace(/\${filename}/g,fileName);
		opt.footer = opt.footer.replace(/\${filename}/g,fileName);

		newContentString = opt.header + newContentString + opt.footer;
		buf = new Buffer(newContentString)

		//	change the file contents
		file.contents = buf;
		//	push the file into the output
		this.push(file);
		callback();
	});
};
