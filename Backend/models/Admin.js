const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    name: {
        type : String , 
        required : false , // Changed to false to allow existing admins without name
        default: "Admin" // Optional default value
    },

    email: { type: String, unique: true , required: true },
    password: { type: String,  required: true },

    //new authentication fields for password reset
    resetPasswordToken: {
        type: String,
    },
    
    resetPasswordExpire: {
        type: Date,
    },


}, 
{ timestamps: true });


AdminSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Admin', AdminSchema);
