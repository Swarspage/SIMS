const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    score: { type: Number, min: 0, required: true },
    outOf: { type: Number, min: 1, required: true }
});

const semesterInfoSchema = new mongoose.Schema({

    stuID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
},

    semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },

    attendance: { type: Number, min: 0, max: 100, required: true },
    kts: { type: [String], default: [] },
    marks: { type: [markSchema], required: true },
    isDefaulter: { type: Boolean, default: false },



    journalTaken: {
        type: Boolean,
        default: false
    },

    examFormFilled: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

semesterInfoSchema.index({ stuID: 1 });

semesterInfoSchema.index(
  { stuID: 1, semester: 1 },
  { unique: true }
);

semesterInfoSchema.index({ isDefaulter: 1 });
semesterInfoSchema.index({ semester: 1 });

semesterInfoSchema.index({ createdAt: -1 });

module.exports = mongoose.model("SemesterInfo", semesterInfoSchema);
