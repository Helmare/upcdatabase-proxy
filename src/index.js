import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

const AUTH_HEADER = 'x-upcdp-authorization';

// Get environment variables.
dotenv.config();
const host = process.env.UPCD_HOST || 'https://api.upcdatabase.org';
const port = process.env.PORT || 3000;

const proxyToken = process.env.PROXY_TOKEN;
if (!proxyToken) {
  console.error('Missing PROXY_TOKEN environment variable for authentication.');
  process.exit(-1);
}

const app = express();
app.use(async (req, res) => {
  try {
    // Authenticate proxy.
    console.log(req.headers[AUTH_HEADER]);
    if (req.headers[AUTH_HEADER] != `Bearer ${proxyToken}`) {
      console.warn(`${req.ip} | Failed proxy authentication.`);
      res.status(407).send({ success: false, error: "Failed proxy authentication." });
      return;
    }


    // Fix header information.
    req.headers['Authorization'] ||= req.headers['authorization'];
    delete req.headers['authorization'];
    delete req.headers[AUTH_HEADER];
    delete req.headers.host;

    // Pass request to upcdatabase.org
    console.log(`${req.ip} | ${req.method} ${host}${req.url}`);
    const response = await axios({
      url: `${host}${req.url}`,
      method: req.method,
      headers: req.headers,
      data: req.body
    });

    // Send upcdatabase.org response.
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
  console.log(`Use header "${AUTH_HEADER}: Bearer ${proxyToken}" to authenticate.\n`);
});