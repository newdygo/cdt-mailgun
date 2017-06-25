var app = require('express')();
var bodyParser = require('body-parser')
var mongo = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/api/click').post(function(req, res) {
        
    var us = process.env.MONGODB_USER;
    var pw = process.env.MONGODB_PASSWORD;
    var s0 = process.env.MONGODB_SHARD_00;
    var s1 = process.env.MONGODB_SHARD_01;
    var s2 = process.env.MONGODB_SHARD_02;
    var db = process.env.MONGODB_DATABASE;
    
    mongo.connect(`mongodb://${us}:${pw}@${s0},${s1},${s2}/${db}?ssl=true&replicaSet=CDTMongo-shard-0&authSource=admin`, function(err, db) {
                       
        if (!err) {
            
            var account = db.collection.findOne({ recipient: req.body.recipient });
            
            if (account === null)
            {
                account = {
                    recipient: req.body.recipient,
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
                };
            } else {
	        account = {
                        recipient: req.body.recipient,
                        {
						$push: {
							'events': {
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
				}
			}
		
            db.collection('accounts').update({ recipient: req.body.recipient }, account, { upsert: true });
            db.close();
        }
    });

    res.status(200);
    res.send({message: "OK"});   
});

app.listen(process.env.PORT || 8080);
