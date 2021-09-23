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
    city: {
        type: String,
    },
     region :{
         type: String,
     },
     country:{
         type: String,
     }
              
           
});


module.exports = mongoose.model('Users',UserSchema);
