
var express = require('express');
var bodyParser = require("body-parser");
var mongo = require('mongodb').MongoClient;
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.route('/api').post(function(req, res) {
    
    //mongo.connect('mongodb://admin_conductor:jUBeKXUd2GTcvlAL@cdtmongo-shard-00-02-btirt.mongodb.net:27017/MailGun?ssl=true&replicaSet=CDTMongo-shard-0&authSource=admin', function(err, db) {
    //                    
    //    if (!err) {
//
    //        var eventt = {
    //                city: req.body.city,
    //                domain: req.body.domain,
    //                recipient: req.body.recipient,
    //                event: req.body.event,
    //                timestamp: req.body.timestamp,
    //                token: req.body.token,
    //                signature: req.body.signature
    //        };
//
    //        db.collection('events').insert(eventt);
    //    }
//
    //    db.close();
    //});
    
    res.status(200);
    res.send({message: "OK"});
    
});

app.listen(process.env.PORT || 3000);
