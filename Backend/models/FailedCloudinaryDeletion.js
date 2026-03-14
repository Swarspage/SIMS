const mongoose = require("mongoose");

const failedCloudinaryDeletionSchema = new mongoose.Schema({

    publicId: {
        type: String,
        required: true,
        unique : true,
        trim: true
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model( "FailedCloudinaryDeletion", failedCloudinaryDeletionSchema );