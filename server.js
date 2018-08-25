const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
  const reqMessage = req.body.Body;
  let resMessage = `I'm sorry, this is the wrong code :-(`;

  if (reqMessage === '9999') {
    resMessage = `6666`;
  }

  const twiml = new MessagingResponse();

  twiml.message(resMessage);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

