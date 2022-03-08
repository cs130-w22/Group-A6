const request = require('supertest');
const app = require("../index");

describe('API test suite', () => {
  it('test POST /createmeeting', async() => {
      const response = await request(app).get("/createmeeting", {meetingStart: '2021-03-04T17:25:00-08:00', meetingEnd: '2021-03-04T18:25:00-08:00', meetingHost: 'you@gmail.com', duration: 10}); 
      expect(response.statusCode).toBe(200); // Should be 200 but I get 404 :(

  });

  // Insert other tests below this line

});