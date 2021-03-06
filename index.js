const express = require('express');

const app = express()

app.set('secret','this is secret')

app.use(require('cors')())
app.use(express.json())

app.use('/uploads', express.static(__dirname + '/uploads'))

require('./DB/db')(app)
require('./routes/admin/index')(app)



const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server is listening at localhost: ${PORT}`)
})