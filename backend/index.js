const express = require('express')
const app = express()
const port = 3000

const clientId = '380079468239-va56g9fdsdbigemstpik3in1el1codm5.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(clientId)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/validate', (req, res) => {

  const token1 = req.body['token'];

  async function verify(){
    const ticket = await client.verifyIdToken({
      idToken: token1,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    resolve(payload['sub']);
  }

  verify().then(x => {
    res.send(x);
  });
})
app.listen(port, () => {
  console.log(`Let's Meet backend: listening on port ${port}`)
})