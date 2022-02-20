/**
 * This function returns one optimal meeting time.
 *
 * @param {array of array of time intervals} conflictTimes: Each element is an array which represents one meeting participant's times which conflict with other events.
 * @param {array of array of time intervals} preferredTimes: Each element is an array which represents one meeting participant's preferred meeting times.
 * @param {Date object} startTime: Earliest time that the meeting can be held.
 * @param {Date object} endTime: Latest time that the meeting can be held.
 * @param {integer} meetingDuration: Length of the meeting (minutes).
 * @return {array of time interval} Uses UTC time.
 * 
 * Note: a time interval is a 2-element array of JS Date objects
 * The function priotizes a meeting time which has the least amount of conflictTimes, followed by the most preferredTimes among the participants. 
 * Pseudocode:
    num_conflict = inf
    num_prefer = inf
    curr_conflict = 0
    curr_prefer = 0

    iterate through each 5 min interval from startTime to (endTime - meetingDuration):
        set meeting to start then and end after meetingDuration
        iterate over each conflict:
            if it intersects with meeting:
                curr_conflict += 1
        iterate over each prefer:
            if it intersects with meeting:
                curr_prefer += 1
        if curr_conflict <  num_conflict or (curr_conflict == num_conflict and curr_prefer > num_prefer):
            num_conflict = curr_conflict
            num_prefer = curr_prefer
            set current meeting as the best
        curr_conflict = 0
        curr_prefer = 0
    return best meeting time
 */

function calculateOptimalMeetingTime(conflictTimes, preferredTimes, startTime, endTime, meetingDuration) {
    let num_conflict = Number.MAX_SAFE_INTEGER;
    let num_prefer = Number.MAX_SAFE_INTEGER;

    let best_start = null;
    let best_end = null;

    let curr_conflict = 0;
    let curr_prefer = 0;


    meeting_start = startTime;
    meeting_end = new Date(meeting_start);
    // console.log(meeting_end)
    // console.log(meetingDuration)
    // console.log(startTime)
    meeting_end.setMinutes(startTime.getMinutes() + meetingDuration);
    // console.log(meeting_start);
    // console.log(meeting_end);
    const INTERVAL = 5; // We search over each 5 minute period by default 
    while (meeting_end <= endTime){
        for (const participant of conflictTimes) { // Loop over each participant
            for (const time_interval of participant) { // Loop over each time interval
                if ((time_interval[0] > meeting_start ? time_interval[0] : meeting_start) <= (time_interval[1] < meeting_end ? time_interval[0] : meeting_end)){
                    curr_conflict += 1;
                    break;
                }
            }
        }

        for (const participant of preferredTimes) { // Loop over each participant
            for (const time_interval of participant) { // Loop over each time interval
                if ((time_interval[0] <= meeting_start) && (time_interval[1] >= meeting_end)){
                    curr_prefer += 1;
                    break;
                }
            }
        }
        // console.log("TEST")
        // console.log(curr_conflict)
        // console.log(num_conflict)
        // console.log(curr_prefer);
        // console.log(num_prefer);
        if (curr_conflict <  num_conflict || (curr_conflict == num_conflict && curr_prefer > num_prefer)){
            console.log("TEST")
            console.log(curr_conflict)
            console.log(curr_prefer)
            console.log(meeting_start)
            console.log(meeting_end)
            num_conflict = curr_conflict
            num_prefer = curr_prefer
            best_start = new Date(meeting_start);
            best_end = new Date(meeting_end);
        }
        // console.log("TEST")
        // console.log(curr_conflict)
        // console.log(curr_prefer)
        // console.log(meeting_start)
        // console.log(meeting_end)
        curr_conflict = 0
        curr_prefer = 0

        meeting_start.setMinutes(meeting_start.getMinutes() + INTERVAL);
        meeting_end.setMinutes(meeting_end.getMinutes() + INTERVAL);
    } 
    return [best_start, best_end];

}

exports.calculateOptimalMeetingTime = calculateOptimalMeetingTime;