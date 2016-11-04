var mx = require('./dist/mx.js');
var domain = require('./dist/domain.js');
var ip = require('./dist/ip.js');
var page = require('./dist/page.js');

mx.crawlMX('pubu.im').then(function(r){console.log(r)});
domain.crawlDomain('pubu.im').then(function(r){console.log(r)});
ip.crawlIP('pubu.im').then(function(r){console.log(r)});
page.crawlPage('https://pubu.im').then(function(r){console.log(r)});