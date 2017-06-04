var express = require('express');
var app = express();

app.route('/api').post(function(req, res) {
    
    console.log('Starting...');
    console.log(req);

    res.status(200);
    res.send({message: "OK"});   
});

app.listen(process.env.PORT || 8080);
