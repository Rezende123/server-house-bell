const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/* Routes */
app.post('/ring-the-bell', (req, res) => {
    let response = {sendNotification: false};

    if (req.body.ringingTheBell) {
        console.log('TOCANDO A CAMPAINHA');
        response.sendNotification = true;
    }

    res.json(response);
});

/* App listen */
app.listen(3000, () => {
    console.log(`nodejs-backend is running`);
    console.log(`open in http://127.0.0.1:3000/ring-the-bell`);
});
