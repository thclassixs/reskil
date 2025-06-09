"use client";
import { useState } from 'react';
import { User, Mail, Calendar, Edit3, Camera, Settings, Shield, Award, MapPin, Globe, Phone } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and personal information</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              Share Profile
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Section with Gradient */}
        <div className="h-40 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          <div className="absolute top-4 right-4">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-8 pb-8">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-20 mb-6">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                <img
                  src="/avatars/hamza.webp?height=160&width=160"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Name and Basic Info */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h2>
            <p className="text-lg text-gray-600 mb-3">Senior Software Engineer</p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                reskil.dev
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">support@reskil.com</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Active Now
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Posts', value: '2.5K', icon: Edit3, color: 'blue' },
              { label: 'Followers', value: '1.2K', icon: User, color: 'purple' },
              { label: 'Following', value: '845', icon: User, color: 'indigo' },
              { label: 'Achievements', value: '12', icon: Award, color: 'amber' }
            ].map((stat, index) => (
              <div key={stat.label} className="group relative">
                <div className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-${stat.color}-200 group-hover:scale-105`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color}-500 text-white mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className={`text-2xl font-bold text-${stat.color}-700 mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                Account Details
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              >
                <Edit3 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
              </button>
            </div>
            
            <div className="space-y-5">
              {[
                { label: 'Username', value: 'johndoe123', icon: User },
                { label: 'Member Since', value: 'January 1, 2024', icon: Calendar },
                { label: 'Phone', value: '+1 (555) 123-4567', icon: Phone },
                { label: 'Last Login', value: '2 hours ago', icon: Globe }
              ].map((item, index) => (
                <div key={item.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">{item.label}</span>
                  </div>
                  <span className="text-gray-900 font-semibold">{item.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-medium">Account Type</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                  Premium
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: Edit3,
                  title: 'Edit Profile',
                  description: 'Update your personal information and preferences',
                  color: 'blue',
                  badge: null
                },
                {
                  icon: Shield,
                  title: 'Privacy Settings',
                  description: 'Manage your privacy and security preferences',
                  color: 'green',
                  badge: 'Updated'
                },
                {
                  icon: Settings,
                  title: 'Account Settings',
                  description: 'Configure notifications and account preferences',
                  color: 'purple',
                  badge: null
                }
              ].map((action, index) => (
                <button key={action.title} className={`w-full group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-${action.color}-300 bg-gradient-to-r hover:from-${action.color}-50 hover:to-${action.color}-100 transition-all duration-300 hover:shadow-md`}>
                  <div className="flex items-center gap-4 p-4">
                    <div className={`p-3 rounded-lg bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}>
                      <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-gray-900">{action.title}</div>
                        {action.badge && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full bg-${action.color}-100 text-${action.color}-700`}>
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{action.description}</div>
                    </div>
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity text-${action.color}-600`}>
                      →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">About Me</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Edit
          </button>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Welcome to my profile! I'm passionate about technology, design, and creating amazing user experiences. 
            I love connecting with like-minded individuals and sharing knowledge with the community. Currently working 
            on innovative solutions that bridge the gap between design and development.
          </p>
        </div>
        
        {/* Skills/Interests */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Skills & Interests</h4>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'JavaScript', level: 'Expert', color: 'yellow' },
              { name: 'React', level: 'Expert', color: 'blue' },
              { name: 'Design', level: 'Advanced', color: 'purple' },
              { name: 'Photography', level: 'Intermediate', color: 'green' },
              { name: 'Travel', level: 'Enthusiast', color: 'orange' }
            ].map((skill) => (
              <div key={skill.name} className={`group relative px-4 py-2 bg-gradient-to-r from-${skill.color}-100 to-${skill.color}-200 text-${skill.color}-800 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 border border-${skill.color}-300`}>
                <span>{skill.name}</span>
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                  {skill.level}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Recent Activity</h4>
          <div className="space-y-3">
            {[
              'Updated profile information',
              'Completed React certification',
              'Published new blog post about UX design'
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{activity}</span>
                <span className="text-gray-400">• {2 + index} days ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}