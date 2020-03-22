const OneSignal = require('onesignal-node');
const client = new OneSignal.Client(
    '1096356845228', 
    'AAAA_0P11qw:YjRmOTgwODMtNGE1ZC00ZjhiLTk0ZmUtNWM3NmYxN2Q4ZDNl'
);
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const notification = {
    contents: {
      'pt': 'Tem alguém tocando a campainha.',
      'en': 'Have someone ringing the bell.',
    }
  };
/* Routes */
app.post('/ring-the-bell', (req, res) => {
    let response = {sendNotification: false};

    if (req.body.ringingTheBell) {
        console.log('TOCANDO A CAMPAINHA');
        response.sendNotification = true;
        client.createNotification(notification)
            .then(res => {
                console.log('CAMPAINHA TOCADA');
                res.json(res);
            })
            .catch(err => {
                console.log('ERRO AO NOTIFICAR');
                res.json(err);
            })
    } else {
        res.json({sendNotification: false});
    }

});

/* App listen */
app.listen(3000, () => {
    console.log(`nodejs-backend is running`);
    console.log(`open in http://127.0.0.1:3000/ring-the-bell`);
});
