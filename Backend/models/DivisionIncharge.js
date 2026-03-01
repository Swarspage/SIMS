const mongoose=require("mongoose");


const divisionInchargeSchema = new mongoose.Schema({

    name : {
        type : String,
    },

    year : {
        type : String,
        enum : ["SE", "TE", "BE"],
    },

    division : {
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


divisionInchargeSchema.index({ year: 1, division: 1 });
divisionInchargeSchema.index({ createdAt: -1 });


module.exports = mongoose.model('DivisionIncharge', divisionInchargeSchema);