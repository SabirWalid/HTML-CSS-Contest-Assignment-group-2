const express = require('express');
const fetch = require('node-fetch').default;

const app = express();
const PORT = 3000;

app.get('/convert', (req, res) => {
  const { amount, from, to } = req.query;
  const url = `https://api.exchangerate-api.com/v4/latest/${USD}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to];
      if (rate) {
        const convertedAmount = amount * rate;
        res.json({ amount: convertedAmount });
      } else {
        res.status(400).json({ error: 'Invalid currency code' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
