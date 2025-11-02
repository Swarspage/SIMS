const { required } = require("joi");
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
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

    // ✅ ADDED: Internship Type
    internshipType: {
      type: String,
      enum: ["Technical", "Non-Technical", "Research"],
      default: "Technical",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    durationMonths: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },

    // ✅ IMPROVED: Stipend Info
    stipendInfo: {
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      stipend: {
        type: Number,
        min: 0,
        required: function () {
          return this.stipendInfo?.isPaid === true;
        },
      },
    },

    description: {
      type: String,
      required: true,
    },

    // ✅ IMPROVED: File management
    internshipReport: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    photoProof: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    // ✅ ADDED: Status tracking
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Pending"],
      default: "Pending",
    },

    // ✅ ADDED: Verification fields
    isVerified: {
      type: Boolean,
      default: false,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
