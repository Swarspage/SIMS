const { required } = require("joi");
const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({

    stuID: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    rollno: String,
    year: String,     // se/te/be
    div: String,
    course: { type: String, required: true , default : "Computer Engineering" },
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

    //if yes then do nothing, if yes then ask for reason
    scholarshipNotAppliedReason: {
        type: String,
        required: function () {
            return this.isScholarshipApplied === false;
        }
    },

    //academic yr => 2023-2024
    academicYear: {
        type: String,
        required: true
    } ,

    //mahadbt form
    isMahadbtFormSubmitted: {
        type: Boolean,
        default: false
    } ,

    mahadbtFilledDate: {
        type: Date ,
        required : function() { return this.isMahadbtFormSubmitted == true ; }
    } ,

    mahadbtNotFilledReason: {
        type : String ,
        required : function() { return this.isMahadbtFormSubmitted == false ; }
    },

//migration certificate
    hasMigrationCertificate: {
        type: Boolean,
        default: false
    },

    migrationExpectedDate: {
        type: Date,
        required: function () {
            return this.hasMigrationCertificate === true;
        }
    },

    migrationNotAvailableReason: {
        type: String,
        required: function () {
            return this.hasMigrationCertificate === false;
        }
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
admissionSchema.index({ isMahadbtFormSubmitted: 1 });
admissionSchema.index({ hasMigrationCertificate: 1 });


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