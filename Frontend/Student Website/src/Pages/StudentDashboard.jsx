// import React, { useState, useEffect } from "react";
// import { activityService } from "../services/activityService";
// import { achievementService } from "../services/achievementService";
// import { internshipService } from "../services/internshipService";
// import { placementService } from "../services/placementService";
// import { higherStudiesService } from "../services/higherStudiesService";

// export default function StudentDashboard() {
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalActivities: 0,
//     totalAchievements: 0,
//     internshipStatus: "Pending",
//     placementStatus: "Not Placed",
//     higherStudiesStatus: "Not Applied",
//   });

//   const [recentActivities, setRecentActivities] = useState([]);
//   const [activityByCategory, setActivityByCategory] = useState({});
//   const [achievementByCategory, setAchievementByCategory] = useState({});

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       console.log("🚀 Starting dashboard data fetch...");

//       // Fetch Activities
//       let activities = [];
//       try {
//         console.log("📍 Fetching activities...");
//         const activityResponse = await activityService.getActivityByStu();
//         activities =
//           activityResponse.data ||
//           activityResponse.activities ||
//           activityResponse ||
//           [];
//         console.log("✅ Activities fetched:", activities);
//       } catch (err) {
//         console.error("❌ Error fetching activities:", err);
//       }

//       // Fetch Achievements
//       let achievements = [];
//       try {
//         console.log("📍 Fetching achievements...");
//         const achievementResponse =
//           await achievementService.getAchievementsByStu();
//         achievements =
//           achievementResponse.data ||
//           achievementResponse.achievements ||
//           achievementResponse ||
//           [];
//         console.log("✅ Achievements fetched:", achievements);
//       } catch (err) {
//         console.error("❌ Error fetching achievements:", err);
//       }

//       // Fetch Internship
//       let hasInternship = false;
//       try {
//         console.log("📍 Fetching internships...");
//         const internshipResponse = await internshipService.getOwnInternships();
//         const internships =
//           internshipResponse.data ||
//           internshipResponse.internships ||
//           internshipResponse ||
//           [];
//         console.log("✅ Internships fetched:", internships);
//         hasInternship = internships.length > 0;
//       } catch (err) {
//         console.error("❌ Error fetching internships:", err);
//       }

//       // Fetch Placement
//       let hasPlacement = false;
//       try {
//         console.log("📍 Fetching placements...");
//         const placementResponse = await placementService.getOwnPlacements();
//         const placements =
//           placementResponse.data ||
//           placementResponse.placements ||
//           placementResponse ||
//           [];
//         console.log("✅ Placements fetched:", placements);
//         hasPlacement = placements.length > 0;
//       } catch (err) {
//         console.error("❌ Error fetching placements:", err);
//       }

//       // Fetch Higher Studies
//       let hasHigherStudies = false;
//       try {
//         console.log("📍 Fetching higher studies...");
//         const higherStudiesResponse =
//           await higherStudiesService.getOwnHigherStudies();
//         const higherStudies =
//           higherStudiesResponse.data ||
//           higherStudiesResponse.higherStudies ||
//           higherStudiesResponse ||
//           [];
//         console.log("✅ Higher studies fetched:", higherStudies);
//         hasHigherStudies = higherStudies.length > 0;
//       } catch (err) {
//         console.error("❌ Error fetching higher studies:", err);
//       }

//       // Process activity categories
//       const activityCategories = {};
//       activities.forEach((activity) => {
//         activityCategories[activity.type] =
//           (activityCategories[activity.type] || 0) + 1;
//       });
//       console.log("📊 Activity Categories:", activityCategories);

//       // Process achievement categories
//       const achievementCategories = {};
//       achievements.forEach((achievement) => {
//         achievementCategories[achievement.category] =
//           (achievementCategories[achievement.category] || 0) + 1;
//       });
//       console.log("📊 Achievement Categories:", achievementCategories);

//       // Get recent activities (latest 5)
//       const recent = activities.slice(-5).reverse();
//       console.log("📋 Recent Activities:", recent);

//       setStats({
//         totalActivities: activities.length,
//         totalAchievements: achievements.length,
//         internshipStatus: hasInternship ? "Done" : "Pending",
//         placementStatus: hasPlacement ? "Placed" : "Not Placed",
//         higherStudiesStatus: hasHigherStudies ? "Applied" : "Not Applied",
//       });

//       setRecentActivities(recent);
//       setActivityByCategory(activityCategories);
//       setAchievementByCategory(achievementCategories);

//       console.log("✅ Dashboard data loaded successfully!");
//     } catch (error) {
//       console.error("❌ Error loading dashboard:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <main className="p-8 bg-slate-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-slate-600">Loading your dashboard...</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="p-8 bg-slate-50 min-h-screen">
//       {/* Welcome Section */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold text-slate-900">Welcome Back!</h1>
//         <p className="text-slate-600 mt-2">
//           Here's your complete career journey overview
//         </p>
//       </div>

//       {/* Quick Stats Cards */}
//       <div className="grid grid-cols-5 gap-6 mb-10">
//         {/* Activities Card */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-600 mb-1">
//                 Total Activities
//               </p>
//               <p className="text-3xl font-bold text-blue-600">
//                 {stats.totalActivities}
//               </p>
//             </div>
//             <div className="bg-blue-100 rounded-full p-4">
//               <svg
//                 className="w-6 h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Achievements Card */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-600 mb-1">
//                 Achievements
//               </p>
//               <p className="text-3xl font-bold text-green-600">
//                 {stats.totalAchievements}
//               </p>
//             </div>
//             <div className="bg-green-100 rounded-full p-4">
//               <svg
//                 className="w-6 h-6 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Internship Status */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-600 mb-1">
//                 Internship
//               </p>
//               <p
//                 className={`text-2xl font-bold ${
//                   stats.internshipStatus === "Done"
//                     ? "text-purple-600"
//                     : "text-slate-400"
//                 }`}
//               >
//                 {stats.internshipStatus}
//               </p>
//             </div>
//             <div
//               className={`rounded-full p-4 ${
//                 stats.internshipStatus === "Done"
//                   ? "bg-purple-100"
//                   : "bg-slate-100"
//               }`}
//             >
//               <svg
//                 className={`w-6 h-6 ${
//                   stats.internshipStatus === "Done"
//                     ? "text-purple-600"
//                     : "text-slate-400"
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 13.255A23.931 23.931 0 0112 15c-3.728 0-7.196-.575-10.468-1.673M5 13a10 10 0 1120 0m0 0a10.038 10.038 0 01-1.463 4.09c1.622 1.084 3.61 1.71 5.791 1.71 2.18 0 4.17-.626 5.793-1.71A10.038 10.038 0 0121 13.255z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Placement Status */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-600 mb-1">
//                 Placement
//               </p>
//               <p
//                 className={`text-2xl font-bold ${
//                   stats.placementStatus === "Placed"
//                     ? "text-emerald-600"
//                     : "text-slate-400"
//                 }`}
//               >
//                 {stats.placementStatus === "Placed" ? "✓ Placed" : "Not Placed"}
//               </p>
//             </div>
//             <div
//               className={`rounded-full p-4 ${
//                 stats.placementStatus === "Placed"
//                   ? "bg-emerald-100"
//                   : "bg-slate-100"
//               }`}
//             >
//               <svg
//                 className={`w-6 h-6 ${
//                   stats.placementStatus === "Placed"
//                     ? "text-emerald-600"
//                     : "text-slate-400"
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Higher Studies Status */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-slate-600 mb-1">
//                 Higher Studies
//               </p>
//               <p
//                 className={`text-xl font-bold ${
//                   stats.higherStudiesStatus === "Applied"
//                     ? "text-amber-600"
//                     : "text-slate-400"
//                 }`}
//               >
//                 {stats.higherStudiesStatus === "Applied" ? "Applied" : "N/A"}
//               </p>
//             </div>
//             <div
//               className={`rounded-full p-4 ${
//                 stats.higherStudiesStatus === "Applied"
//                   ? "bg-amber-100"
//                   : "bg-slate-100"
//               }`}
//             >
//               <svg
//                 className={`w-6 h-6 ${
//                   stats.higherStudiesStatus === "Applied"
//                     ? "text-amber-600"
//                     : "text-slate-400"
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6.253v13m0-13C6.228 6.228 2 10.228 2 15s4.228 8.772 10 8.772 10-4.228 10-8.772c0-4.772-4.228-8.747-10-8.747z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Row */}
//       <div className="grid grid-cols-2 gap-6 mb-10">
//         {/* Activity Distribution Chart */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//           <h3 className="text-lg font-semibold text-slate-900 mb-4">
//             Activities by Category
//           </h3>
//           <div className="space-y-3">
//             {Object.entries(activityByCategory).length > 0 ? (
//               Object.entries(activityByCategory).map(([category, count]) => (
//                 <div key={category}>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-slate-700">
//                       {category}
//                     </span>
//                     <span className="text-sm font-bold text-blue-600">
//                       {count}
//                     </span>
//                   </div>
//                   <div className="w-full bg-slate-200 rounded-full h-2">
//                     <div
//                       className="bg-blue-600 h-2 rounded-full"
//                       style={{
//                         width: `${
//                           (count /
//                             Math.max(...Object.values(activityByCategory))) *
//                           100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-slate-500 text-sm">No activities yet</p>
//             )}
//           </div>
//         </div>

//         {/* Achievement Distribution Chart */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//           <h3 className="text-lg font-semibold text-slate-900 mb-4">
//             Achievements by Category
//           </h3>
//           <div className="space-y-3">
//             {Object.entries(achievementByCategory).length > 0 ? (
//               Object.entries(achievementByCategory).map(([category, count]) => (
//                 <div key={category}>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-slate-700">
//                       {category}
//                     </span>
//                     <span className="text-sm font-bold text-green-600">
//                       {count}
//                     </span>
//                   </div>
//                   <div className="w-full bg-slate-200 rounded-full h-2">
//                     <div
//                       className="bg-green-600 h-2 rounded-full"
//                       style={{
//                         width: `${
//                           (count /
//                             Math.max(...Object.values(achievementByCategory))) *
//                           100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-slate-500 text-sm">No achievements yet</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Recent Activities Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-6 border-b border-slate-200">
//           <h3 className="text-lg font-semibold text-slate-900">
//             Recent Activities
//           </h3>
//         </div>

//         <div className="divide-y divide-slate-200">
//           {recentActivities.length > 0 ? (
//             recentActivities.map((activity, index) => (
//               <div key={index} className="p-6 hover:bg-slate-50 transition">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h4 className="font-semibold text-slate-900">
//                       {activity.title}
//                     </h4>
//                     <p className="text-sm text-slate-600 mt-1">
//                       {activity.description}
//                     </p>
//                     <div className="flex gap-4 mt-3">
//                       <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
//                         {activity.type}
//                       </span>
//                       <span className="text-xs text-slate-500">
//                         {new Date(activity.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                       <svg
//                         className="w-5 h-5 text-blue-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-6 text-center">
//               <p className="text-slate-500">
//                 No activities recorded yet. Start exploring!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import { activityService } from "../services/activityService";
import { achievementService } from "../services/achievementService";
import { internshipService } from "../services/internshipService";
import { placementService } from "../services/placementService";
import { higherStudiesService } from "../services/higherStudiesService";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalAchievements: 0,
    internshipStatus: "Pending",
    placementStatus: "Not Placed",
    higherStudiesStatus: "Not Applied",
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [activityByCategory, setActivityByCategory] = useState({});
  const [achievementByCategory, setAchievementByCategory] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // ... your original data fetch logic (unchanged) ...
      let activities = [];
      let achievements = [];
      let hasInternship = false;
      let hasPlacement = false;
      let hasHigherStudies = false;

      // Activities
      try {
        const activityResponse = await activityService.getActivityByStu();
        activities =
          activityResponse.data ||
          activityResponse.activities ||
          activityResponse ||
          [];
      } catch (err) {}

      // Achievements
      try {
        const achievementResponse =
          await achievementService.getAchievementsByStu();
        achievements =
          achievementResponse.data ||
          achievementResponse.achievements ||
          achievementResponse ||
          [];
      } catch (err) {}

      // Internship
      try {
        const internshipResponse = await internshipService.getOwnInternships();
        const internships =
          internshipResponse.data ||
          internshipResponse.internships ||
          internshipResponse ||
          [];
        hasInternship = internships.length > 0;
      } catch (err) {}

      // Placement
      try {
        const placementResponse = await placementService.getOwnPlacements();
        const placements =
          placementResponse.data ||
          placementResponse.placements ||
          placementResponse ||
          [];
        hasPlacement = placements.length > 0;
      } catch (err) {}

      // HigherStudies
      try {
        const higherStudiesResponse =
          await higherStudiesService.getOwnHigherStudies();
        const higherStudies =
          higherStudiesResponse.data ||
          higherStudiesResponse.higherStudies ||
          higherStudiesResponse ||
          [];
        hasHigherStudies = higherStudies.length > 0;
      } catch (err) {}

      // Process categories
      const activityCategories = {};
      activities.forEach((activity) => {
        activityCategories[activity.type] =
          (activityCategories[activity.type] || 0) + 1;
      });
      const achievementCategories = {};
      achievements.forEach((achievement) => {
        achievementCategories[achievement.category] =
          (achievementCategories[achievement.category] || 0) + 1;
      });
      const recent = activities.slice(-5).reverse();

      setStats({
        totalActivities: activities.length,
        totalAchievements: achievements.length,
        internshipStatus: hasInternship ? "Done" : "Pending",
        placementStatus: hasPlacement ? "Placed" : "Not Placed",
        higherStudiesStatus: hasHigherStudies ? "Applied" : "Not Applied",
      });

      setRecentActivities(recent);
      setActivityByCategory(activityCategories);
      setAchievementByCategory(achievementCategories);
    } catch (error) {
      // error handling
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-4 sm:p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-2 xs:p-3 sm:p-6 md:p-8 bg-slate-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-7 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
          Welcome Back!
        </h1>
        <p className="text-slate-600 mt-1 sm:mt-2">
          Here's your complete career journey overview
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-7 sm:mb-10">
        {/* Activities Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                Total Activities
              </p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">
                {stats.totalActivities}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-2 sm:p-4">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Achievements Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                Achievements
              </p>
              <p className="text-xl sm:text-3xl font-bold text-green-600">
                {stats.totalAchievements}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-2 sm:p-4">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Internship Status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                Internship
              </p>
              <p
                className={`text-lg sm:text-2xl font-bold ${
                  stats.internshipStatus === "Done"
                    ? "text-purple-600"
                    : "text-slate-400"
                }`}
              >
                {stats.internshipStatus}
              </p>
            </div>
            <div
              className={`rounded-full p-2 sm:p-4 ${
                stats.internshipStatus === "Done"
                  ? "bg-purple-100"
                  : "bg-slate-100"
              }`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  stats.internshipStatus === "Done"
                    ? "text-purple-600"
                    : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.728 0-7.196-.575-10.468-1.673M5 13a10 10 0 1120 0m0 0a10.038 10.038 0 01-1.463 4.09c1.622 1.084 3.61 1.71 5.791 1.71 2.18 0 4.17-.626 5.793-1.71A10.038 10.038 0 0121 13.255z"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Placement Status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                Placement
              </p>
              <p
                className={`text-lg sm:text-2xl font-bold ${
                  stats.placementStatus === "Placed"
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                {stats.placementStatus === "Placed" ? "✓ Placed" : "Not Placed"}
              </p>
            </div>
            <div
              className={`rounded-full p-2 sm:p-4 ${
                stats.placementStatus === "Placed"
                  ? "bg-emerald-100"
                  : "bg-slate-100"
              }`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  stats.placementStatus === "Placed"
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Higher Studies Status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">
                Higher Studies
              </p>
              <p
                className={`text-lg sm:text-xl font-bold ${
                  stats.higherStudiesStatus === "Applied"
                    ? "text-amber-600"
                    : "text-slate-400"
                }`}
              >
                {stats.higherStudiesStatus === "Applied" ? "Applied" : "N/A"}
              </p>
            </div>
            <div
              className={`rounded-full p-2 sm:p-4 ${
                stats.higherStudiesStatus === "Applied"
                  ? "bg-amber-100"
                  : "bg-slate-100"
              }`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  stats.higherStudiesStatus === "Applied"
                    ? "text-amber-600"
                    : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C6.228 6.228 2 10.228 2 15s4.228 8.772 10 8.772 10-4.228 10-8.772c0-4.772-4.228-8.747-10-8.747z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-7 sm:mb-10">
        {/* Activity Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
            Activities by Category
          </h3>
          <div className="space-y-3">
            {Object.entries(activityByCategory).length > 0 ? (
              Object.entries(activityByCategory).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (count /
                            Math.max(...Object.values(activityByCategory))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-xs sm:text-sm">
                No activities yet
              </p>
            )}
          </div>
        </div>
        {/* Achievement Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
            Achievements by Category
          </h3>
          <div className="space-y-3">
            {Object.entries(achievementByCategory).length > 0 ? (
              Object.entries(achievementByCategory).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-green-600">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (count /
                            Math.max(...Object.values(achievementByCategory))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-xs sm:text-sm">
                No achievements yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Recent Activities
          </h3>
        </div>
        <div className="divide-y divide-slate-200">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 hover:bg-slate-50 transition"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                      {activity.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-3 flex-wrap">
                      <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                        {activity.type}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right self-center md:self-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 sm:p-6 text-center">
              <p className="text-slate-500 text-xs sm:text-sm">
                No activities recorded yet. Start exploring!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
