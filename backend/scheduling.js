/**
 * This function returns up to a variable number (default = 5) of optimal meeting times.
 *
 * @param {array of array of time intervals} conflictTimes: Each element is an array which represents one meeting participant's times which conflict with other events.
 * @param {array of array of time intervals} preferredTimes: Each element is an array which represents one meeting participant's preferred meeting times.
 * @param {Date object} startTime: Earliest time that the meeting can be held.
 * @param {Date object} endTime: Latest time that the meeting can be held.
 * @param {integer} meetingDuration: Length of the meeting (minutes).
 * @param {integer} interval: lower value means searches over more meeting blocks. Recommended to default to 15.
 * @return {array of time intervals} Uses UTC time.
 * 
 * Note: a time interval is a 2-element array of JS Date objects
 * The function priotizes a meeting time which has the least amount of conflictTimes, followed by the most preferredTimes among the participants. If it is not possible to find the requested number of meeting times, the remaining time intervals in the array will be null arrays.
 * 
 */

function calculateOptimalMeetingTime(conflictTimes, preferredTimes, startTime, endTime, meetingDuration, interval = 15) {
    const NUM_TIMES = 5; // Number of times to return

    let num_conflict = Number.MAX_SAFE_INTEGER;
    let num_prefer = Number.MAX_SAFE_INTEGER;

    let best_start = null;
    let best_end = null;

    let curr_conflict = 0;
    let curr_prefer = 0;

    let return_array = [];

    meeting_start = startTime;
    meeting_end = new Date(meeting_start);
    meeting_end.setMinutes(startTime.getMinutes() + meetingDuration);

    while (meeting_end <= endTime){
        for (const participant of conflictTimes) { // Loop over each participant
            for (const time_interval of participant) { // Loop over each time interval
                if ((time_interval[0] > meeting_start ? time_interval[0] : meeting_start) <= (time_interval[1] < meeting_end ? time_interval[1] : meeting_end)){
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

        if (curr_conflict < num_conflict || (curr_conflict == num_conflict && curr_prefer > num_prefer)){
            num_conflict = curr_conflict;
            num_prefer = curr_prefer;
            return_array = [[new Date(meeting_start), new Date(meeting_end)]];
        }
        else if (curr_conflict == num_conflict && curr_prefer == num_prefer){
            return_array.push([new Date(meeting_start), new Date(meeting_end)])
        }

        curr_conflict = 0;
        curr_prefer = 0;

        meeting_start.setMinutes(meeting_start.getMinutes() + interval);
        meeting_end.setMinutes(meeting_end.getMinutes() + interval);
    } 
    
    if (return_array.length > NUM_TIMES){
        return return_array.slice(0, NUM_TIMES);
    }
    else{
        while (return_array.length < NUM_TIMES){
            return_array.push([null, null])
        }
        return return_array;
    }

}

exports.calculateOptimalMeetingTime = calculateOptimalMeetingTime;