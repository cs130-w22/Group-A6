const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const scheduler = require('./scheduling')


const serviceAccount = require('./firebase.json');

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

    const userRef = db.collection('users').doc(meetingHost)


    //const startTimestamp = new Date(meetingStart);
    //const endTimestamp = new Date(meetingEnd);

    db.collection('meetings').add({
        meetingHost: meetingHost,
        meetingStart: meetingStart,
        meetingEnd: meetingEnd,
        duration: parseInt(duration)
    }).then(result => {
        userRef.set({
            hostedMeetings: FieldValue.arrayUnion(result.id)
        }, {merge:true}).then()
        res.send(result.id)
    });
})

app.post('/updatemeeting', (req, res) =>
{
   const attendee = req.body['attendee']
   const meetingId = req.body['meetingId']

   const meetingConflicts = req.body['meetingConflict']
   const preferredTimes = req.body['preferredTimes']

   const meetingRef = db.collection('meetings').doc(meetingId)
    const userRef = db.collection('users').doc(attendee)

    meetingRef.update({
        attendees: FieldValue.arrayUnion(attendee),
        conflicts: FieldValue.arrayUnion(meetingConflicts),
        preferredTimes: FieldValue.arrayUnion(preferredTimes)
    }).then(result => {
        userRef.set({
            attendedMeetings: FieldValue.arrayUnion(meetingId)
        }, {merge:true}).then()
        res.send('OK')

    });
});

app.post('/createmeetingevent', (req, res) => {
    const meetingId = req.body['meetingId']

    const meetingRef = db.collection('meetings').doc(meetingId)

    meetingRef.get().then(result =>{
        const data = result.data();

        const conflicts = data['conflicts']

        const conflictsArr = JSON.parse(conflicts)


        var conflictIntervals = [[]]
        for(let i = 0; i < conflictsArr.length; i++){
            var temp = []
            for(let j = 0; j < conflictsArr[i].length; j++){
                temp.push(new Date(conflictsArr[i][j]))
            }
            conflictIntervals[0].push(temp)
        }
        const duration = data['duration']

        var preferredIntervals = [[[]]]
        const optimalTime = scheduler.calculateOptimalMeetingTime(conflictIntervals, preferredIntervals, new Date(data['meetingStart']), new Date(data['meetingEnd']), duration)

        meetingRef.update({meetingCreated: true}).then()
        res.send({optimalTime:optimalTime, attendees:data['attendees']})


    })
});

app.post('/getmeetinginfo', (req, res)=> {
    const meetingId = req.body['meetingId']

    const meetingRef = db.collection('meetings').doc(meetingId)

    meetingRef.get().then(result => {
        res.send(result.data())
    });
});

app.post('/getuserinfo', (req, res) => {
    const userRef = db.collection('users').doc(req.body['userId'])

    userRef.get().then(result => {
        res.send(result.data())
    })
})

app.listen(port, () => {
  console.log(`Let's Meet backend: listening on port ${port}`)
})
