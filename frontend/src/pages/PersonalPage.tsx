import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const PersonalPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'January 2023',
    avatar: '/Photo.png'
  });

  const [editForm, setEditForm] = useState(profile);

  const personalStats = [
    { label: 'Total Balance', value: '$12,450.67', icon: AccountBalanceWalletIcon, color: 'text-accent-green' },
    { label: 'Monthly Growth', value: '+8.5%', icon: TrendingUpIcon, color: 'text-accent-green' },
    { label: 'Total Transactions', value: '1,247', icon: ReceiptIcon, color: 'text-accent-blue' },
    { label: 'Account Rating', value: '4.8/5', icon: StarIcon, color: 'text-accent-yellow' }
  ];

  const recentActivity = [
    { type: 'Transaction', description: 'Payment received from Client A', amount: '+$2,500', date: '2 hours ago', status: 'completed' },
    { type: 'Withdrawal', description: 'Bank transfer to savings', amount: '-$1,200', date: '1 day ago', status: 'completed' },
    { type: 'Investment', description: 'Stock purchase - AAPL', amount: '-$800', date: '3 days ago', status: 'pending' },
    { type: 'Transaction', description: 'Freelance payment', amount: '+$1,800', date: '1 week ago', status: 'completed' }
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold tracking-tight mb-4 bg-gradient-to-r from-accent-green to-accent-yellow bg-clip-text text-transparent drop-shadow-lg">
        Personal Profile
      </div>

      {/* Profile Header */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md border border-accent-green/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-accent-green object-cover"
              />
              {!isEditing && (
                <button className="absolute bottom-0 right-0 bg-accent-green p-2 rounded-full hover:bg-accent-green/80 transition-colors">
                  <EditIcon className="w-4 h-4 text-bg-main" />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-main">{profile.name}</h2>
              <p className="text-text-muted">Premium Member</p>
              <p className="text-sm text-text-muted">Member since {profile.joinDate}</p>
            </div>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors"
            >
              <EditIcon className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors"
              >
                <SaveIcon className="w-4 h-4" />
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-bg-main border border-border-dark text-text-muted rounded-lg hover:bg-bg-card transition-colors"
              >
                <CancelIcon className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <EmailIcon className="text-accent-green" />
              <div>
                <label className="text-sm text-text-muted">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                  />
                ) : (
                  <p className="text-text-main">{profile.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="text-accent-green" />
              <div>
                <label className="text-sm text-text-muted">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                  />
                ) : (
                  <p className="text-text-main">{profile.phone}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LocationOnIcon className="text-accent-green" />
              <div>
                <label className="text-sm text-text-muted">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="w-full px-3 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                  />
                ) : (
                  <p className="text-text-main">{profile.location}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarTodayIcon className="text-accent-green" />
              <div>
                <label className="text-sm text-text-muted">Join Date</label>
                <p className="text-text-main">{profile.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {personalStats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-xl p-6 shadow-md border border-accent-green/20">
            <div className="flex items-center gap-4">
              <stat.icon className={`text-2xl ${stat.color}`} />
              <div>
                <div className="text-sm text-text-muted font-medium">{stat.label}</div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md border border-accent-green/20">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-bg-main rounded-lg border border-border-dark">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${activity.status === 'completed' ? 'bg-accent-green' : 'bg-accent-yellow'}`}></div>
                <div>
                  <div className="font-medium text-text-main">{activity.type}</div>
                  <div className="text-sm text-text-muted">{activity.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${activity.amount.startsWith('+') ? 'text-accent-green' : 'text-accent-yellow'}`}>
                  {activity.amount}
                </div>
                <div className="text-sm text-text-muted">{activity.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalPage; 