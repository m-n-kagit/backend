const express = require('express')
const port =4000
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
app.get('/twitter', (req, res) => {
  res.send('hello world')
})

app.listen(port, ( ) => {
  console.log(`Example app listening on port ${port}`);
  
})