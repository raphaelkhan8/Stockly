const express = require('express');
const cors = require('cors');
const { stockInfoRouter } = require('./routes/stockInfoRouter');
const app = express();
const port = 3001;

app.use(cors());
app.use(stockInfoRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})