const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },

    id : {
        type: String,
        required:true,
    },
    ipAdress : {
        type: String,
        required:true,
    },
    phone : {
        type: String,
        required:true,
    },

});


module.exports = mongoose.model('Users',UserSchema);
