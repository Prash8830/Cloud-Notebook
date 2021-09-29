const connecToMongo = require('./db');
const express = require('express')

connecToMongo();   
const app = express()
const port = 3000

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes') );

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})