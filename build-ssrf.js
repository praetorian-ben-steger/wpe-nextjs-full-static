var http = require('http'); // 1 - Import Node.js core module
const { exec } = require("child_process");
const url = require('url');
const axios = require('axios');
fs = require('fs');

var result = '';

axios.get("https://google.com", {headers: {'Metadata-Flavor': 'Google'}}, { transformResponse: (r) => r }).then((r) =>{
    result = JSON.stringify(r.data);   
    fs.writeFileSync('ssrf.result', result);
}, (error) => {
    console.log(error);
    result = JSON.stringify(error);    
    fs.writeFileSync('ssrf.result', result);    
});