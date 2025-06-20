"use client";
import { useState } from 'react';
import { User, Mail, Calendar, Edit3, Camera, Shield, Award, MapPin, Globe, Phone } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    name: "Hamza El Amrani",
    email: "hamza@reskil.com",
    role: "Student",
    domain: "Driving",
    location: "Casablanca, Morocco",
    joinDate: "June 10, 2025",
    lastLogin: "2 hours ago",
    status: "Active",
    bio: "Passionate about learning new skills and sharing knowledge with the community. Currently focused on mastering driving techniques and safety.",
    progress: {
      completedCourses: 5,
      ongoingCourses: 2,
      achievements: 3
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600 mt-1">{user.role} in {user.domain}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Picture */}
          <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 p-6 flex flex-col items-center">
            <div className="relative group -mt-2">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                <img
                  src="/avatars/hamza.webp"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Camera className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mt-4">{user.name}</h2>
            <p className="text-blue-600 font-medium">{user.role}</p>
            
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
            
            <div className="w-full mt-6">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">{user.joinDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="text-gray-900">{user.lastLogin}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {user.status}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Progress Overview</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{user.progress.completedCourses}</p>
                  <p className="text-xs text-gray-600">Courses Completed</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">{user.progress.ongoingCourses}</p>
                  <p className="text-xs text-gray-600">Ongoing</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-amber-600">{user.progress.achievements}</p>
                  <p className="text-xs text-gray-600">Achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">About</h2>
              {isEditing ? (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Save Changes
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
            
            {isEditing ? (
              <textarea
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={user.bio}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Interests</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Driving Techniques",
                "Road Safety",
                "Defensive Driving",
                "Vehicle Maintenance",
                "Navigation",
                "Traffic Laws"
              ].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Completed 'Defensive Driving' course",
                  date: "Today",
                  icon: <Award className="w-5 h-5 text-green-500" />
                },
                {
                  title: "Started 'Advanced Parking Techniques'",
                  date: "2 days ago",
                  icon: <Calendar className="w-5 h-5 text-blue-500" />
                },
                {
                  title: "Achieved 'Safe Driver' badge",
                  date: "1 week ago",
                  icon: <Shield className="w-5 h-5 text-purple-500" />
                },
                {
                  title: "Updated profile information",
                  date: "1 week ago",
                  icon: <User className="w-5 h-5 text-amber-500" />
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}