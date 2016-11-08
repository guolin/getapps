var ga = require('./dist/index.js')

const URL = process.argv.slice(2)[0];

console.log('url is ', URL);

ga.getApps(URL).then(console.log);