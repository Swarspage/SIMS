const DivisionIncharge = require("../models/DivisionIncharge");
const Student = require("../models/Student");
const Activity = require("../models/Activity");
const Achievement = require("../models/Achievement");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const HigherStudies = require("../models/HigherStudies");
const mongoose = require("mongoose");


// ================= DIVISION INCHARGE DASHBOARD =================
exports.divisionDashboard = async (req, res) => {
  try {

    const divIncharge = await DivisionIncharge.findById(req.user.id);

    if (!divIncharge) {
      return res.status(404).json({ message: "Division Incharge not found" });
    }

    const { year, division } = divIncharge;

    // Get students of that division
    const students = await Student.find(
      { year, division },
      { _id: 1 }
    );

    const studentIDs = students.map(s => s._id);

    const [
      totalStudents,
      totalActivities,
      totalAchievements,
      totalInternships,
      totalPlacements,
      totalHigherStudies,
      placementsByType,
      achievementsByCategory,
      activitiesByType,
      internshipsByType,
      recentAchievements
    ] = await Promise.all([

      Student.countDocuments({ year, division }),

      Activity.countDocuments({ stuID: { $in: studentIDs } }),

      Achievement.countDocuments({ stuID: { $in: studentIDs } }),

      Internship.countDocuments({ stuID: { $in: studentIDs } }),

      Placement.countDocuments({ stuID: { $in: studentIDs } }),

      HigherStudies.countDocuments({ stuID: { $in: studentIDs } }),

      // placements by type
      Placement.aggregate([
        {
          $match: { stuID: { $in: studentIDs } }
        },
        {
          $group: {
            _id: "$placementType",
            count: { $sum: 1 }
          }
        }
      ]),

      // achievements by category
      Achievement.aggregate([
        {
          $match: { stuID: { $in: studentIDs } }
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]),

      // activities by type
      Activity.aggregate([
        {
          $match: { stuID: { $in: studentIDs } }
        },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 }
          }
        }
      ]),

      // internships by paid/unpaid
      Internship.aggregate([
        {
          $match: { stuID: { $in: studentIDs } }
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$stipendInfo.isPaid", true] },
                "Paid",
                "Unpaid"
              ]
            },
            count: { $sum: 1 }
          }
        }
      ]),

      // recent achievements
      Achievement.find({
        stuID: { $in: studentIDs }
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("stuID", "studentID name year division branch")
        .lean()

    ]);

    return res.json({
      stats: {
        totalStudents,
        totalActivities,
        totalAchievements,
        totalInternships,
        totalPlacements,
        totalHigherStudies
      },

      placementsByType,

      achievementsByCategory,

      activitiesByType,

      internshipsByType,

      recentAchievements
    });

  } catch (error) {
    console.error("Division dashboard error:", error);
    return res.status(500).json({ message: "Internal Server Error. Please Try Again Later" });
  }
};



// ================= ADMIN DASHBOARD =================
exports.adminDashboard = async (req, res) => {
  try {

    const [
      totalStudents,
      totalActivities,
      totalAchievements,
      totalInternships,
      totalPlacements,
      totalHigherStudies,
      placementsByType,
      achievementsByCategory,
      activitiesByType,
      internshipsByType,
      recentAchievements
    ] = await Promise.all([

      Student.countDocuments(),

      Activity.countDocuments(),

      Achievement.countDocuments(),

      Internship.countDocuments(),

      Placement.countDocuments(),

      HigherStudies.countDocuments(),

      // placements by type
      Placement.aggregate([
        {
          $group: {
            _id: "$placementType",
            count: { $sum: 1 }
          }
        }
      ]),

      // achievements by category
      Achievement.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]),

      // activities by type
      Activity.aggregate([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 }
          }
        }
      ]),

      // internships by paid/unpaid
      Internship.aggregate([
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$stipendInfo.isPaid", true] },
                "Paid",
                "Unpaid"
              ]
            },
            count: { $sum: 1 }
          }
        }
      ]),

      // recent achievements
      Achievement.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("stuID", "studentID name year division branch")
        .lean()

    ]);

    return res.json({
      stats: {
        totalStudents,
        totalActivities,
        totalAchievements,
        totalInternships,
        totalPlacements,
        totalHigherStudies
      },

      placementsByType,

      achievementsByCategory,

      activitiesByType,

      internshipsByType,

      recentAchievements
    });

  } catch (error) {
    console.error("Admin dashboard error:", error);
    return res.status(500).json({ message: "Internal Server Error. Please Try Again Later" });
  }
};

// ================= STUDENT DASHBOARD =================
exports.studentDashboard = async (req, res) => {
  try {

    const stuID = new mongoose.Types.ObjectId(req.user.id);

    const [
      totalStudents,
      totalActivities,
      totalAchievements,
      totalInternships,
      totalPlacements,
      totalHigherStudies,
      placementsByType,
      achievementsByCategory,
      activitiesByType,
      internshipsByType
    ] = await Promise.all([

      // only 1 student
      Student.countDocuments({ _id: stuID }),

      Activity.countDocuments({ stuID }),

      Achievement.countDocuments({ stuID }),

      Internship.countDocuments({ stuID }),

      Placement.countDocuments({ stuID }),

      HigherStudies.countDocuments({ stuID }),

      // placements by type
      Placement.aggregate([
        { $match: { stuID } },
        {
          $group: {
            _id: "$placementType",
            count: { $sum: 1 }
          }
        }
      ]),

      // achievements by category
      Achievement.aggregate([
        { $match: { stuID } },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]),

      // activities by type
      Activity.aggregate([
        { $match: { stuID } },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 }
          }
        }
      ]),

      // internships paid/unpaid
      Internship.aggregate([
        { $match: { stuID } },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$stipendInfo.isPaid", true] },
                "Paid",
                "Unpaid"
              ]
            },
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    return res.json({
      stats: {
        totalStudents,
        totalActivities,
        totalAchievements,
        totalInternships,
        totalPlacements,
        totalHigherStudies
      },

      placementsByType,
      achievementsByCategory,
      activitiesByType,
      internshipsByType
    });

  } catch (error) {
    console.error("Student dashboard error:", error);
    return res.status(500).json({ message: "Internal Server Error. Please Try Again Later" });
  }
};