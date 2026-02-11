const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
	stuID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},

	companyName: {
		type: String,
		required: true,
	},

	role: {
		type: String,
		required: true,
	},

	placementType: {
		type: String,
		enum: ["Campus", "Off-Campus"],
		required: true,
	},

	// NEW FIELDS (as per HOD requirement)
	// package in lpa
	package: {
		type: Number,
		required: true,
		min: 1,
		max: 100,
	},

	placementYear: {
		type: String,
		required: true,
	},

	passoutYear: {
		type: String,
		required: true,
	},

	joiningYear: {
		type: String,
		required: true,
	},

	// LOI / Offer letter / Joining letter (PDF)
	placementProof: {
		url: { type: String, required: true },
		publicId: { type: String, required: true },
	},

}, { timestamps: true });

placementSchema.index({ stuID: 1 });                 // REQUIRED for $lookup

placementSchema.index({ companyName: 1 });
placementSchema.index({ role: 1 });

placementSchema.index({ placementType: 1 });

placementSchema.index({ package: -1 });              // for sorting highest → lowest

placementSchema.index({ createdAt: -1 });            // sort for pagination


module.exports = mongoose.model("Placement", placementSchema);
