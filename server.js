const express = require('express');
const geoip = require('geoip-lite');

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Content-Type', 'application/json');
  next();
});
 
app.get('/api', (req, res) => {
  // Getting the user's IP from the query parameter;
  const ip = req.query.ip;
  const geo = geoip.lookup(ip);

  if (!geo) {
    return res.status(422).json({
      ...geo,
      error: `IP ${ip} not found.`,
    });
  }

  return res.status(200).json(geo);
});

app.listen(port, function() {
  console.log('API listening on port ' + port);
});



