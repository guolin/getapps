#!/usr/bin/env node

var ga = require('./dist/index.js')
var domain = process.argv.slice(2)[0];

if (!domain) {
	console.log('you need specify a domain.');
	return process.exit();
}

console.log('Domain :', domain);
console.log('start to crawl... \n');

ga.getApps(domain)
.then(
	function(apps) {
		console.log(domain, 'is using:');
		console.log('------------------');
		console.log(apps.join('\n'));
		console.log('------------------');
		console.log('total: ', apps.length, '\n');
	}, function(error){
		console.error('some error', error);
	});