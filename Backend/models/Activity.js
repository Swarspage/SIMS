const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    stuID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    type: {
      type: String,
      enum: ["Committee"], // Only Committee allowed
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    date: {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },
    certificateURL: {
      url: { type: String }, // Cloudinary secure URL
      publicId: { type: String }, // Cloudinary public_id for deletion
    },
  },
  { timestamps: true }
);

activitySchema.index({ stuID: 1 });
activitySchema.index({ type: 1 });
activitySchema.index({ "date.from": -1 });
activitySchema.index({ createdAt: -1 });

activitySchema.index({ stuID: 1, "date.from": -1 });

activitySchema.index({
  title: "text",
  description: "text"
});

module.exports = mongoose.model("Activity", activitySchema);
