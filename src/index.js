import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

// Get environment variables.
dotenv.config();
const host = process.env.UPCD_HOST || 'https://api.upcdatabase.org';
const port = process.env.PORT || 3000;

const app = express();
app.use(async (req, res) => {
  try {
    delete req.headers.host;
    if (req.headers['authorization']) {
      req.headers['Authorization'] = req.headers['authorization'];
      delete req.headers['authorization'];
    }

    console.log(`${req.method} ${host}${req.url}`);
    const response = await axios({
      url: `${host}${req.url}`,
      method: req.method,
      headers: req.headers,
      data: req.body
    });

    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    res.send(response.data);
  }
  catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`https://api.database.org proxy running on port ${port}`);
});