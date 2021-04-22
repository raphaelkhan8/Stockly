const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

async function callToPythonAsync(file, args) {
    let p = spawn('python', [file, args]);
    for await (const data of p.stdout) {
        return data
    }
    p.kill('SIGINT');
}

app.get('/stock/:ticker', async (req, res) => {
    const { ticker } = req.params;
    console.log("TICKER!!!!!!!", ticker);
    try {
        const data = await  callToPythonAsync('./stock_summarizer.py', ticker);
        const stringifiedData = data.toString();
        console.log("=======================================================", stringifiedData);
        res.send(stringifiedData);
    } catch (err) {
        console.log(err)
        res.statusCode(501).json({message : err.message})
    }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})