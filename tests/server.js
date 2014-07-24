var express = require('express'),
    bodyParser = require('body-parser');
    app     = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/..'));

module.exports = http.createServer(app);