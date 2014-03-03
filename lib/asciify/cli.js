var	templateFile = process.argv[3],
	codeFile = process.argv[2],
	substitute = require('./substitute.js'),
	thunkify = require('thunkify'),
	fs = require('fs'),
	co = require('co'),
	colors = require('colors'),
	readFile = thunkify(fs.readFile);

function usage() {
	console.log([
		"Turns your JavaScript into ascii drawings",
		"USAGE: asciify code.js template\n",
		"Checkout examples on URL"
	].join('\n'));
}

function encode(str) {
	return new Buffer(str).toString('base64');
}

var cli = module.exports = function () {
	if (codeFile && codeFile.match(/\-h/)) {
		usage();
		return;
	}

	if (!codeFile || !templateFile) {
		console.log('Hey! I need code and template files path.'.red);
		usage();
		return;
	}

	co(function *() {
		try {
			var code = yield readFile(codeFile, 'utf8');
			var template = yield readFile(templateFile, 'utf8');
			console.log(substitute(encode(code), template));
		} catch (e) {
			console.log('Oops. %s'.red, e);
			return;
		}
	})();
};
