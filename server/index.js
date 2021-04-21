const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

async function callToPythonAsync(file, args) {
    let p = spawn('python', [file, args]);
    for await (const data of p.stdout) {
        return data
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/stock/:ticker', (req, res) => {
    const { ticker } = req.params;
    callToPythonAsync('./stock_summarizer.py', ticker).then(data => { 
        const stringifiedData = data.toString();
        console.log("=======================================================", stringifiedData);
        res.send(stringifiedData);
    });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})