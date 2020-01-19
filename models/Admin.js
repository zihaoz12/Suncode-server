const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type:String,
        //not show password in front-end
        select:false,
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
    }
})

module.exports = mongoose.model('Admin',AdminSchema)