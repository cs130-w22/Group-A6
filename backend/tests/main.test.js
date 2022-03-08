const request = require("supertest");

// var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/createmeeting',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'meetingStart': '2021-03-04T17:25:00-08:00',
    'meetingEnd': '2021-03-04T18:25:00-08:00',
    'meetingHost': 'you@gmail.com',
    'duration': '10'
  }
};

describe('API test suite', () => {
  it('test POST /createmeeting', async() => {
    request(options, function (error, response) {
      console.log("HI");
      expect(response.statusCode).toBe(200);
      if (error) throw new Error(error);
      console.log("HI");
    });
  });
});


