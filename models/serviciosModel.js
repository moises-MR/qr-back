const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const serviceSchema = new Schema({

    url:{
        type:String,
    },
    nameService:{
        type:String
    },
    services:{
        type:Array
    }


});



module.exports = mongoose.model("servicios",serviceSchema);

