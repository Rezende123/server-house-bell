const OneSignal = require('onesignal-node');
const client = new OneSignal.Client(
    'dd72b879-4174-4fef-8ba5-1faa0ff6cb94', 
    'YjRmOTgwODMtNGE1ZC00ZjhiLTk0ZmUtNWM3NmYxN2Q4ZDNl'
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
    android_channel_id: '47549fb7-382e-462c-98b7-a4b59e21ea37',
    headings: {
        'pt': 'Atenção à porta',
        'en': 'Warning to door',
    },
    contents: {
        'pt': 'Tem alguém tocando a campainha.',
        'en': 'Have someone ringing the bell.',
    },
    included_segments: ['Subscribed Users']
};
/* Routes */
app.post('/ring-the-bell', (req, res) => {
    let response = {sendNotification: false};

    if (req.body.ringingTheBell) {
        response.sendNotification = true;
        client.createNotification(notification)
            .then(resNotification => {
                res.json({resNotification});
            })
            .catch(err => {
                console.log('ERRO AO NOTIFICAR: \n', err);
                res.json({err});
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
