const express = require('express');

const app = express()

app.use(require('cors')())
app.use(express.json())

require('./DB/db')(app)
require('./routes/admin')(app)

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server is listening at localhost: ${PORT}`)
})