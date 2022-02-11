const express = require('express');
const app = express();
const path = require('path');


const port = 3000

app.use(express.static('../frontend/letsMeet/Assets.xcassets'))

app.get('/', (req, res) => {
  console.log('User is in the home page')
  res.status(200).sendFile(path.join(__dirname, "../frontend/index.html")); //placeholder
})

app.get('/about', (req, res) => {
  console.log('User is in the about page');
  res.status(200).send('About page');
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Page not found</h1>')
})

app.listen(port, () => {
  console.log(`Let's Meet backend: listening on port ${port}`)
})