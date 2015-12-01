var fs = require('fs');

if (process.argv.length < 3) {
	console.log('err: missing argument');
	process.exit();
}

var file = {};
	file.name = process.argv[2];
	if (process.argv[3] === undefined) {
		file.lang = "en";
	} else {
		file.lang = process.argv[3];
	}

fs.readFile(file.name + '.json', 'utf8', function (err, data) {
	if(err === null) {
		file.content = data;
		listFileContent();
	} else {
		console.log('err: file not found');
		process.exit();
	}
});

function listFileContent() {
	file.key = [];
	file.storage = {};
	var content = JSON.parse(file.content);
	var lang = file.lang;
	for (var key in content) {
		file.storage[parseFloat(key).toFixed(2)] = parseFloat(key).toFixed(2) + " - " + content[key][lang];
		file.key.push(parseFloat(key).toFixed(2));
	}
	sortFileKey();
	showFileContent();
}

function sortFileKey() {
	file.key.sort(function(a, b) {
		return a - b;
	});
}

function showFileContent() {
	var before = 0;
	for (var i = 0; i < file.key.length; i++) {
		console.log("[" + (file.key[i] - before).toFixed(2) + "]");
		console.log(file.storage[file.key[i]]);
		before = file.key[i];
	}
}