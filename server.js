const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
