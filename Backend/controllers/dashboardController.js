const DivisionIncharge = require("../models/DivisionIncharge");
const Student = require("../models/Student");
const Activity = require("../models/Activity");
const Achievement = require("../models/Achievement");
const Internship = require("../models/Internship");
const Placement = require("../models/Placement");
const HigherStudies = require("../models/HigherStudies");


// ================= DIVISION INCHARGE DASHBOARD =================

exports.divisionDashboard = async (req, res) => {
  try {

    const divIncharge = await DivisionIncharge.findById(req.user.id);

    const { year, division } = divIncharge;

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
      placementsByType,
      achievementsByCategory
    ] = await Promise.all([

      Student.countDocuments({ year, division }),

      Activity.countDocuments({ stuID: { $in: studentIDs } }),

      Achievement.countDocuments({ stuID: { $in: studentIDs } }),

      Internship.countDocuments({ stuID: { $in: studentIDs } }),

      Placement.countDocuments({ stuID: { $in: studentIDs } }),

      Placement.aggregate([
        { $match: { stuID: { $in: studentIDs } } },
        {
          $group: {
            _id: "$placementType",
            count: { $sum: 1 }
          }
        }
      ]),

      Achievement.aggregate([
        { $match: { stuID: { $in: studentIDs } } },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ])

    ]);

    res.json({
      stats: {
        totalStudents,
        totalActivities,
        totalAchievements,
        totalInternships,
        totalPlacements
      },
      placementsByType,
      achievementsByCategory
    });

  } catch (error) {
    console.error("Division dashboard error:", error);
    res.status(500).json({ message: "Dashboard error" });
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
      achievementsByCategory
    ] = await Promise.all([

      Student.countDocuments(),

      Activity.countDocuments(),

      Achievement.countDocuments(),

      Internship.countDocuments(),

      Placement.countDocuments(),

      HigherStudies.countDocuments(),

      Placement.aggregate([
        {
          $group: {
            _id: "$placementType",
            count: { $sum: 1 }
          }
        }
      ]),

      Achievement.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ])

    ]);

    res.json({
      stats: {
        totalStudents,
        totalActivities,
        totalAchievements,
        totalInternships,
        totalPlacements,
        totalHigherStudies
      },
      placementsByType,
      achievementsByCategory
    });

  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Dashboard error" });
  }
};



// ================= STUDENT DASHBOARD =================

exports.studentDashboard = async (req, res) => {
  try {

    const stuID = req.user.id;

    const [
      totalActivities,
      totalAchievements,
      internship,
      placement,
      higherStudies,
      activitiesByType,
      achievementsByCategory
    ] = await Promise.all([

      Activity.countDocuments({ stuID }),

      Achievement.countDocuments({ stuID }),

      Internship.exists({ stuID }),

      Placement.exists({ stuID }),

      HigherStudies.exists({ stuID }),

      Activity.aggregate([
        { $match: { stuID } },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 }
          }
        }
      ]),

      Achievement.aggregate([
        { $match: { stuID } },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ])

    ]);

    res.json({
      stats: {
        totalActivities,
        totalAchievements,
        internshipStatus: internship ? "Done" : "Pending",
        placementStatus: placement ? "Placed" : "Not Placed",
        higherStudiesStatus: higherStudies ? "Applied" : "Not Applied"
      },
      activityDistribution: activitiesByType,
      achievementDistribution: achievementsByCategory
    });

  } catch (error) {
    console.error("Student dashboard error:", error);
    res.status(500).json({ message: "Dashboard error" });
  }
};