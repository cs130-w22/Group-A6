const request = require("supertest");

// Test 1: POST /createmeeting
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
      expect(response.statusCode).toBe(200);
      if (error) throw new Error(error);
    });
  });
});

// Test 2: POST /updatemeeting

var options = {
  'method': 'POST',
  'url': 'http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/updatemeeting',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'attendee': 'bob@gmail.com',
    'meetingId': 'pRrSBEIHv1v41Cu7vKzN',
    'meetingConflict': '[["2021-03-04T17:25:00-08:00", "2021-03-04T17:35:00-08:00"]]',
    'preferredTimes': '[["2020-08-03T17:25:00-04:00", "2020-08-03T17:28:00-04:00"]]'
  }
};

describe('API test suite', () => {
  it('test POST /updatemeeting', async() => {
    request(options, function (error, response) {
      expect(response.statusCode).toBe(200);
      if (error) throw new Error(error);
    });
  });
});

// Test 4: POST /createmeetingevent

var options = {
  'method': 'POST',
  'url': 'http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/createmeetingevent',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'meetingId': 'pRrSBEIHv1v41Cu7vKzN'
  }
};

describe('API test suite', () => {
  it('test POST /creatingmeetingevent', async() => {
    request(options, function (error, response) {
      expect(response.statusCode).toBe(200);
      if (error) throw new Error(error);
    });
  });
});

// Test 5: POST /getmeetinginfo

var options = {
  'method': 'POST',
  'url': 'localhost:3000/getmeetinginfo',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'meetingId': 'xPEtivm5Y1xUBkIJyKpo'
  }
};

describe('API test suite', () => {
  it('test POST /getmeetinginfo', async() => {
    request(options, function (error, response) {
      expect(response.statusCode).toBe(200);
      if (error) throw new Error(error);
    });
  });
});

// Test 6: POST /getuserinfo

var options = {
  'method': 'POST',
  'url': 'localhost:3000/getuserinfo',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'userId': 'you123@gmail.com'
  }
};


describe('API test suite', () => {
  it('test POST /getuserinfo', async() => {
    request(options, function (error, response) {
      expect(response.statusCode).toBe(200);
      if (error) throw new Error(error);
    });
  });
});