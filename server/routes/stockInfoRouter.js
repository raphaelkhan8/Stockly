const express = require('express');
const amqp = require('amqplib/callback_api');
const { spawn } = require('child_process');
require('dotenv').config();
const { amqpURL } = process.env;

const router = new express.Router();

async function callToPythonAsync(file, args) {
    let p = spawn('python', [file, args]);
    for await (const data of p.stdout) {
        return data
    }
    p.kill('SIGINT');
}

router.get('/stock/:ticker', async (req, res) => {
    const { ticker } = req.params;
    console.log("TICKER!!!!!!!", ticker);
    try {
        const data = await  callToPythonAsync('./stock_summarizer.py', ticker);
        const stringifiedData = data.toString();
        console.log("=======================================================", stringifiedData);
        res.send(stringifiedData);
    } catch (err) {
        console.log(err)
        res.send({message : err.message})
    }
});

// router.get('/stock/:ticker', (req, res) => {
//     let articles = '';
//     const { ticker } = req.params;
//     amqp.connect(amqpURL, (err, conn) => {
//         conn.createChannel(async (err, ch) => {
//          const title = "Retriveing data";
//          ch.assertQueue(title, {durable: false});
//          setTimeout(async () => {
//             try {
//                 const q = await callToPythonAsync('./stock_summarizer.py', ticker);
//                 const stringifiedData = q.toString();
//                 console.log('=============================', stringifiedData);
//                 ch.sendToQueue(stringifiedData, new Buffer(q));
//                 articles = stringifiedData;
//                 console.log(` [X] Send ${articles}`);
//                 res.send(articles);
//              } 
//              catch (err) {
//                  console.error(err);
//                  res.send({message: err.message});
//              }
//          }, 100000)                       
//         });
//         // The connection will close in 10 seconds
//         setTimeout(() => {
//          conn.close();
//         }, 10000);
//        });
// });

module.exports.stockInfoRouter = router;

