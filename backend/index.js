const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const serviceAccount = require('/tmp/firebase.json');

initializeApp({
  credential: cert(serviceAccount)
});



const db = getFirestore();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/createmeeting', (req, res) => {

    const meetingHost = req.body['meetingHost']
    const meetingStart = req.body['meetingStart']
    const meetingEnd = req.body['meetingEnd']
    const duration = req.body['duration']



    const startTimestamp = new Date(meetingStart);
    const endTimestamp = new Date(meetingEnd);

    db.collection('meetings').add({
        meetingHost: meetingHost,
        meetingStart: startTimestamp,
        meetingEnd: endTimestamp,
        duration: parseInt(duration)
    }).then(result => {
        res.send(result.id)
    });

})

app.listen(port, () => {
  console.log(`Let's Meet backend: listening on port ${port}`)
})
