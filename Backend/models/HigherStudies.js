const { required } = require("joi");
const mongoose = require("mongoose");

const higherStudiesSchema = new mongoose.Schema({
	stuID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},

	examName: {
		type: String,
		enum: ["GATE", "CAT", "GRE", "TOEFL", "IELTS", "UPSC"],
		required: true,
	},

	score: {
		type: String,
		required: true,
	},

	marksheet: {
		url: { type: String, required:true },      // Cloudinary secure URL
		publicId: { type: String , required:true}, // Cloudinary public_id for deletion
	},

	idCardPhoto : {
		url: { type: String },      // Cloudinary secure URL
		publicId: { type: String }, // Cloudinary public_id for deletion
	}
},
{ timestamps: true });

higherStudiesSchema.index({ stuID: 1 });             // REQUIRED for $lookup

higherStudiesSchema.index({ examName: 1 });

higherStudiesSchema.index({ createdAt: -1 });        // sorting


module.exports = mongoose.model("HigherStudies", higherStudiesSchema);
