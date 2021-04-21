const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/stock/:ticker', (req, res) => {
    const { ticker } = req.params
    console.log(ticker);
    let dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['./stock_summarizer.py', ticker]);
    // collect data from script
    python.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})