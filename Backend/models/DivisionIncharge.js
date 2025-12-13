const mongoose=require("mongoose");


const divisionInchargeSchema = new mongoose.Schema({

    name : {
        type : String,
    },

    year : {
        type : String,
        enum : ["SE", "TE", "BE"],
    },

    div : {
        type : String,
        enum : ["A", "B", "C"],
    },

    email : {
        type : String,
        unique : true,
    },

    password : {
        type : String,
    }



}, {timestamps:true});

module.exports = mongoose.model('DivisionIncharge', divisionInchargeSchema);