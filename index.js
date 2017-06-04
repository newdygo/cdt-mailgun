var app = require('express')();
var bodyParser = require('body-parser')
var mongo = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/api/click').post(function(req, res) {
    
    mongo.connect('mongodb://admin_conductor:TlJYHDVvIufFk3j9@cdtmongo-shard-00-00-btirt.mongodb.net:27017,cdtmongo-shard-00-01-btirt.mongodb.net:27017,cdtmongo-shard-00-02-btirt.mongodb.net:27017/MailGun?ssl=true&replicaSet=CDTMongo-shard-0&authSource=admin', function(err, db) {
                       
        if (!err) {
            
            var account = {
                recipient: req.body.recipient,
                {
                    $push: {
                        events: {
                            domain: req.body.domain,
                            event: req.body.event,

                            ip: req.body.ip,
                            device_type: req.body["device-type"],
                            client_type: req.body["client-type"],
                            client_name: req.body["client-name"],
                            user_agent: req.body["user-agent"],
                            client_os: req.body["client-os"],

                            country: req.body.country,
                            city: req.body.city,
                            region: req.body.region,

                            message_id: req.body["message-id"],                
                            tag: req.body.tag,
                            timestamp: req.body.timestamp,
                            token: req.body.token,
                            signature: req.body.signature
                        }
                    }
                }
            };
            
            db.collection('accounts').update({ recipient: req.body.recipient }, account, { upsert: true });
            db.close();
        }
    });

    res.status(200);
    res.send({message: "OK"});   
});

app.listen(process.env.PORT || 8080);
