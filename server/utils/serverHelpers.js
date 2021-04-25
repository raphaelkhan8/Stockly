const { spawn } = require('child_process');

async function callToPythonAsync(file, args) {
    let p = spawn('python', [file, args]);
    for await (const data of p.stdout) {
        return data
    }
    p.kill('SIGINT');
  }


  module.exports.callToPythonAsync = callToPythonAsync;