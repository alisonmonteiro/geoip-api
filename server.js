var express = require('express');
var geoip = require('geoip-lite');

var port = process.env.PORT || 8000;
var dev = process.env.NODE_ENV !== 'production';
var app = express();

// Enable CORS
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Content-Type', 'application/json');
  next();
});
 
app.get('/api', function(req, res) {
  // Getting the ip of the client from the query parameter, request headers or remoteAddress
  var ip = req.query.ip;
  var xForwardedFor = (req.headers['x-forwarded-for'] || '').split(/,/)[0];
  var remoteAddress = req.connection.remoteAddress;
  var geo;
  var response;

  ip = ip || xForwardedFor || remoteAddress;

  geo = geoip.lookup(ip);
  if(geo === undefined || geo === null) {
    geo = {};
    geo.ip = ip;
    geo.error = 'undefined';
  } else {
    geo.ip = ip;
    geo.error = false;
  }
  response = JSON.stringify(geo);
  /*
  { ip: 1.2.3.4,
    range: [ 3479299040, 3479299071 ],
    country: 'US',
    region: 'CA',
    city: 'San Francisco',
    ll: [37.7484, -122.4156] }
    */  
  if (dev) {
    console.log('reply', response);
  }
  res.end(response);
});

app.listen(port, function() {
  console.log('API listening on port ' + port);
});



