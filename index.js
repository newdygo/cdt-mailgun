var app = require('express')();
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/api').post(function(req, res) {
    
    console.log('Starting...');
    console.log(req.body);

    res.status(200);
    res.send({message: "OK"});   
});

app.listen(process.env.PORT || 8080);
