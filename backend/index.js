const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const scheduler = require('./scheduling')

const serviceAccount = require('/tmp/firebase.json');

initializeApp({
  credential: cert(serviceAccount)
});



const db = getFirestore();


/**
 * @api {get} / Test Get Request
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup InfoRequests
 *
 *
 */
app.get('/', (req, res) => {
  res.send('Hello World!')
})



/**
 * @api {post} /createmeeting Create a Meeting
 * @apiVersion 1.0.0
 * @apiName CreateMeeting
 * @apiGroup Meetings
 * @apiParam {String} meetingHost  Requesting User, saved as host of the meeting
 * @apiParam {String} meetingStart Time meeting starts
 * @apiParam {String} meetingEnd  Time meeting ends
 * @apiParam {Number} duration   duration of the meeting in seconds
 
 * @apiSuccess {String} meetingId  id of the created meeting
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 		{
 *     "meetingId" : "meeting_Y1xUBkIJyKpo"
 *		}
 */
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
        duration: parseInt(duration),
        meetingCreated: false
    }).then(result => {
        userRef.set({
            hostedMeetings: FieldValue.arrayUnion(result.id)
        }, {merge:true}).then()
        res.send(result.id)
    });
})


/**
 * @api {post} /updatemeeting Update Existing Meeting with id meetingID
 * @apiVersion 1.0.0
 * @apiName UpdateMeeting
 * @apiGroup Meetings
 * @apiParam {String} attendee
 * @apiParam {String} meetingId
 * @apiParam {String} meetingConflict
 *@apiSuccess {String} OK
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     OK
 */
app.post('/updatemeeting', (req, res) =>
{
   const attendee = req.body['attendee']
   const meetingId = req.body['meetingId']

   const meetingConflicts = JSON.stringify(req.body['meetingConflict'])
   const preferredTimes = ""

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

/**
 * @api {post} /createmeetingevent Create an Event for an existing meeting, handling conflicts
 * @apiVersion 1.0.0
 * @apiName CreateMeetingEvent
 * @apiGroup Meetings
 *
 * @apiParam {String} meetingId
 *
 * @apiSuccess {String} optimalTime The optimal time to have event, with minimal time conflict
 * @apiSuccess {String} attendees  List of attendees for given meeting
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
			"optimalTime" : "2021-03-04T17:35:00-08:00",
			"attendees" : { "John", "Jerry" }
 *	   }
 */
app.post('/createmeetingevent', (req, res) => {
    const meetingId = req.body['meetingId']

    const meetingRef = db.collection('meetings').doc(meetingId)

    meetingRef.get().then(result =>{
        const data = result.data();

        const conflicts = data['conflicts']
        var conflictIntervals = [[]]

        for(let a = 0; a < conflicts.length; a++) {
            const conflictsArr = JSON.parse(conflicts[a])

            console.log(conflictsArr)

            for (let i = 0; i < conflictsArr.length; i += 2) {
                var temp = []
                temp.push(new Date(conflictsArr[i]))
                temp.push(new Date(conflictsArr[i + 1]))
                conflictIntervals[0].push(temp)
            }
        }

        const duration = data['duration']

        var preferredIntervals = [[[]]]
        const optimalTime = scheduler.calculateOptimalMeetingTime(conflictIntervals, preferredIntervals, new Date(data['meetingStart']), new Date(data['meetingEnd']), duration)

        meetingRef.update({meetingCreated: true}).then()
        res.send({optimalTime:optimalTime, attendees:data['attendees']})


    })
});


/**
 * @api {post} /getmeetinginfo Get information on existing meeting
 * @apiVersion 1.0.0
 * @apiName GetMeetingInfo
 * @apiGroup InfoRequests
 *
 * @apiParam {String} meetingId  ID unique to an existing meeting
 *
 * @apiParam {String} meetingHost  Requesting User, saved as host of the meeting
 * @apiParam {String} meetingStart Time meeting starts
 * @apiParam {String} meetingEnd  Time meeting ends
 * @apiParam {Number} duration   duration of the meeting in seconds
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"meetingHost" : "John",
 *			"meetingStart" : "2021-03-04T17:35:00-08:00",
 *			"meetingEnd" : "2021-03-04T17:35:00-08:00",
 *			"duration" : "15"
 *	   }
 */
app.post('/getmeetinginfo', (req, res)=> {
    const meetingId = req.body['meetingId']

    const meetingRef = db.collection('meetings').doc(meetingId)

    meetingRef.get().then(result => {
        res.send(result.data())
    });
});

/**
 * @api {post} /getuserinfo Get information on user
 * @apiVersion 1.0.0
 * @apiName GetUserInfo
 * @apiGroup InfoRequests
 *
 * @apiParam {String} userID  ID unique to user
 *
 * @apiParam {String} userID  Unique ID for user
 * @apiParam {String[]} hostedMeetings A collection of meetings this user is hosting
 * @apiParam {String[]} attendedMeetings  A collection of meetings this user is attending
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"userID" : "John",
 *			"hostedMeetings" : { "meeting_ooodw", "meeting_fsaaa1" }
 *			"attendedMeetings" : { "meeting_sg4gw", "meeting_h6edgf" }
 *	   }
 */
app.post('/getuserinfo', (req, res) => {
    const userRef = db.collection('users').doc(req.body['userId'])

    userRef.get().then(result => {
        res.send(result.data())
    })
})

app.listen(port, () => {
  console.log(`Let's Meet backend: listening on port ${port}`)
})
