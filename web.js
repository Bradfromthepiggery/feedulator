var gzippo = require('gzippo'),
    express = require('express'),
    app = express();

app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/src"));
app.listen(process.env.PORT || 5000);