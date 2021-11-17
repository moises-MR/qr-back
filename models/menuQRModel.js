const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const menuSchema = new Schema({
    url:{
        type:String,
        unique:true
    },
    nameRestaurant:{
        type:String
    },
    imgLogo:{
        type:String
    },
    imgPortada:{
        type:String
    }
});


module.exports = mongoose.model("menus",menuSchema);