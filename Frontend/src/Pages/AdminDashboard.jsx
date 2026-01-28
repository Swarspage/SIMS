import React, { useState, useEffect } from "react";
import { studentService } from "../services/studentService";
import { activityService } from "../services/activityService";
import { achievementService } from "../services/achievementService";
import { internshipService } from "../services/internshipService";
import { placementService } from "../services/placementService";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalActivities: 0,
    totalAchievements: 0,
    totalInternships: 0,
    totalPlacements: 0,
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

      // Concurrent data fetching for better performance
      const [
        studentsRes,
        activitiesRes,
        achievementsRes,
        internshipsRes,
        placementsRes,
      ] = await Promise.allSettled([
        studentService.getAllStudents(),
        activityService.getAllActivities(),
        achievementService.getAllAchievements(),
        internshipService.getAllInternships(),
        placementService.getAllPlacements(),
      ]);

      // Helper to safely extract data from responses
      const getData = (result) => {
        if (result.status === "fulfilled") {
          const res = result.value;
          return res.data || res.activities || res.achievements || res.placements || res.internships || res || [];
        }
        return [];
      };

      const students = getData(studentsRes);
      const activities = getData(activitiesRes);
      const achievements = getData(achievementsRes);
      const internships = getData(internshipsRes);
      const placements = getData(placementsRes);

      // Process Categories
      const activityCategories = {};
      activities.forEach((activity) => {
        const type = activity.type || "Other";
        activityCategories[type] = (activityCategories[type] || 0) + 1;
      });

      const achievementCategories = {};
      achievements.forEach((achievement) => {
        const category = achievement.category || "Other";
        achievementCategories[category] = (achievementCategories[category] || 0) + 1;
      });

      // Recent Activities (Global)
      // Assuming activities have a 'date' or 'createdAt' field
      const sortedActivities = [...activities].sort((a, b) => {
        return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
      });
      const recent = sortedActivities.slice(0, 5);

      setStats({
        totalStudents: students.length,
        totalActivities: activities.length,
        totalAchievements: achievements.length,
        totalInternships: internships.length,
        totalPlacements: placements.length,
      });

      setRecentActivities(recent);
      setActivityByCategory(activityCategories);
      setAchievementByCategory(achievementCategories);

    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="p-4 sm:p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading system overview...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-600 mt-2">
          Live statistics and activity across the platform
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">

        {/* Total Students */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalStudents}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Activities</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalActivities}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Achievements</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalAchievements}</p>
            </div>
            <div className="bg-green-100 rounded-full p-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Internships */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Internships</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalInternships}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.728 0-7.196-.575-10.468-1.673M5 13a10 10 0 1120 0m0 0a10.038 10.038 0 01-1.463 4.09c1.622 1.084 3.61 1.71 5.791 1.71 2.18 0 4.17-.626 5.793-1.71A10.038 10.038 0 0121 13.255z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Placements */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Placements</p>
              <p className="text-3xl font-bold text-emerald-600">{stats.totalPlacements}</p>
            </div>
            <div className="bg-emerald-100 rounded-full p-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Activities by Type</h3>
          <div className="space-y-4">
            {Object.entries(activityByCategory).length > 0 ? (
              Object.entries(activityByCategory).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{category}</span>
                    <span className="text-sm font-bold text-blue-600">{count}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(count / Math.max(...Object.values(activityByCategory))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No data available.</p>
            )}
          </div>
        </div>

        {/* Achievement Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Achievements by Category</h3>
          <div className="space-y-4">
            {Object.entries(achievementByCategory).length > 0 ? (
              Object.entries(achievementByCategory).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{category}</span>
                    <span className="text-sm font-bold text-green-600">{count}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(count / Math.max(...Object.values(achievementByCategory))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No data available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Recent Global Activity</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-slate-50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{activity.title}</h4>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{activity.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {activity.type}
                      </span>
                      <span className="text-xs text-slate-500">
                        {activity.date ? new Date(activity.date).toLocaleDateString() : "Date N/A"}
                      </span>
                      {activity.studentName && (
                        <span className="text-xs text-slate-500">
                          • Student: {activity.studentName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-slate-500">No recent activity detected.</p>
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          {/* You could add a Link here to a full activity log page if it existed */}
          <p className="text-xs text-slate-400">Showing last 5 global activities</p>
        </div>
      </div>
    </main>
  );
}
