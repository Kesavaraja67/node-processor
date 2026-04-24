const express = require('express');
const cors = require('cors');
const { processData } = require('./processor');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const result = processData(data);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});