module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/suncode-admin',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}