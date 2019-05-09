const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/db.js');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/jobs', (req, res) => {
  db.getJobs( (err, response) => {
    if (err) console.log(err);
    else { res.send(response); }
  });
});

app.post('/newJob', (req, res) => {
  db.addJob([req.body], (err, response) => {
    if (err) console.log('server error', err);
    else { console.log('successfully inserted', req.body)}
  })
})

app.listen(port, () => console.log(`listening at ${port}`));