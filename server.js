const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
  const reqMessage = req.body.Body.trim();
  let resMessage = `I'm sorry, this is the wrong code :-(`;

  if (reqMessage === '666') {
    resMessage = `Ah yes, the sign of the beast is what we were looking for. Maybe this next clue will help you survive.\n\nzero-zilch-nada 9-7-2`;
  }

  const twiml = new MessagingResponse();

  twiml.message(resMessage);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

