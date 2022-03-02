/**
 * Statement coverage: 100%
 * Branch coverage: 100%
 * Path coverage: 100%
 * 
 * Tests cases:
 * Single participant
 * Multiple participants
 * Multiple conflicts
 * Multiple preferred times
 */

const scheduling = require('../scheduling');

// Test 1
conflictTimes = [[[new Date("July 1 2022 8:00"), new Date("July 1 2022 22:00")]]];
preferredTimes = [[[new Date("July 1 2022 5:00"), new Date("July 1 2022 9:00")]]];
startTime = new Date("July 1 2022 0:00");
endTime = new Date("July 1 2022 23:59");

golden_output = '7/1/2022, 5:00:00 AM,7/1/2022, 6:00:00 AM,7/1/2022, 5:30:00 AM,7/1/2022, 6:30:00 AM,7/1/2022, 6:00:00 AM,7/1/2022, 7:00:00 AM,7/1/2022, 6:30:00 AM,7/1/2022, 7:30:00 AM,,';

output = String(scheduling.calculateOptimalMeetingTime(conflictTimes, preferredTimes, startTime, endTime, 60).toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

test('Scheduling test 1: ', () => {
    expect(output).toBe(golden_output);
  });

// Test 2
conflictTimes = [
    [[new Date("July 1 2022 9:00"), new Date("July 1 2022 10:00")], [new Date("July 1 2022 11:00"), new Date("July 1 2022 12:00")]],
    [[new Date("July 1 2022 8:00"), new Date("July 1 2022 9:00")]],
];
preferredTimes = [
    [[new Date("July 1 2022 8:00"), new Date("July 1 2022 22:00")]],
    [[new Date("July 1 2022 11:00"), new Date("July 1 2022 14:00")]],
];
startTime = new Date("July 1 2022 0:00");
endTime = new Date("July 1 2022 23:59");

golden_output = '7/1/2022, 12:30:00 PM,7/1/2022, 1:30:00 PM,7/1/2022, 1:00:00 PM,7/1/2022, 2:00:00 PM,,,,,,';

output = String(scheduling.calculateOptimalMeetingTime(conflictTimes, preferredTimes, startTime, endTime, 60).toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

test('Scheduling test 2: ', () => {
    expect(output).toBe(golden_output);
  });