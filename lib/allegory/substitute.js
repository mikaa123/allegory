module.exports = function (encoded, template) {
	if (template.match(/\*/g).length < encoded.length) {
		throw "Code doesn't fit in template. You need at least " + encoded.length + " *.";
	}

	// First we merge the encoded code into the template.
	var templateArray = template.split('');

	var cursor = 0;
	for (var i = 0; i < templateArray.length; ++i) {
		templateArray[i] === '*' && (templateArray[i] = encoded[cursor++]);
	}

	// Then we get the length of the longest line.
	var mergedArray = templateArray.join('').split('\n');
	var longestLine = 0;
	mergedArray.forEach(function (line) {
		longestLine = (line.length > longestLine) ? line.length : longestLine;
	});

	var line;
	// Now we add whitespaces to each line so they have the same length.
	for (i = 0; i < mergedArray.length; ++i) {
		line = mergedArray[i];
		mergedArray[i] = line.concat(Array(1 + longestLine - line.length).join(' '));
	}

	// Finally, we wrap the expression with an eval.
	var mergedString = mergedArray.join(' \\\n');
	return 'eval(atob("\\\n' + mergedString + '"));';
};
