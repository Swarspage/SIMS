const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({

    stuID: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    rollno: String,
    year: String,     // fy/sy/ty
    div: String,
    course: { type: String, required: true },
    admissionDate: { type: Date, default: Date.now },
    
    status: { 
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    fees: { type: Number, required: true } , 
    isFeesPaid : {
        type : Boolean ,
        default : false
    } , 

    isScholarshipApplied: {
        type: Boolean,
        default: false
    } , 

    //academic yr => 2023-2024
    academicYear: {
        type: String,
        required: true
    } 
    
}, { timestamps: true });

// Static helper: get unpaid students

admissionSchema.statics.getUnpaidStudents = function (){
    return this.find({ isFeesPaid: false }).populate("stuID");
};

admissionSchema.index({ stuID: 1 });
admissionSchema.index({ academicYear: 1 });
admissionSchema.index({ status: 1 });
admissionSchema.index({ isFeesPaid: 1 });

admissionSchema.index({ academicYear: 1, status: 1 });
admissionSchema.index({ academicYear: 1, isFeesPaid: 1 });

admissionSchema.index({ admissionDate: -1 });
admissionSchema.index({ createdAt: -1 });

// Prevent duplicate admission per academic year
admissionSchema.index(
  { stuID: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
