const express = require('express');
const app = express();
const evaluate = require('./eligibility');

app.use(express.static('public'));
app.use(express.json());

app.post('/evaluate', (req, res) => {
  const result = evaluate(req.body);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
