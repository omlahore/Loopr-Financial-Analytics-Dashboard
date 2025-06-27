import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaletteIcon from '@mui/icons-material/Palette';
import LanguageIcon from '@mui/icons-material/Language';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountSettings, setAccountSettings] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'English'
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: true,
    sessionTimeout: '30'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyReports: true
  });

  const [preferenceSettings, setPreferenceSettings] = useState({
    theme: 'dark',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    autoLogout: true,
    dataExport: true
  });

  const tabs = [
    { id: 'account', label: 'Account', icon: AccountCircleIcon },
    { id: 'security', label: 'Security', icon: SecurityIcon },
    { id: 'notifications', label: 'Notifications', icon: NotificationsIcon },
    { id: 'preferences', label: 'Preferences', icon: PaletteIcon }
  ];

  const handleSave = (section: string) => {
    // In a real app, you would save to backend
    console.log(`Saving ${section} settings`);
  };

  const ToggleButton: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className="focus:outline-none"
    >
      {enabled ? (
        <ToggleOnIcon className="text-accent-green w-8 h-8" />
      ) : (
        <ToggleOffIcon className="text-text-muted w-8 h-8" />
      )}
    </button>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold tracking-tight mb-4 bg-gradient-to-r from-accent-green to-accent-yellow bg-clip-text text-transparent drop-shadow-lg">
        Settings
      </div>

      <div className="bg-bg-card rounded-xl shadow-md border border-accent-green/20 overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-bg-sidebar border-r border-border-dark">
            <nav className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                    activeTab === tab.id
                      ? 'bg-accent-green text-bg-main'
                      : 'text-text-muted hover:bg-bg-main hover:text-text-main'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-main">Account Information</h2>
                  <button
                    onClick={() => handleSave('account')}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors"
                  >
                    <SaveIcon className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-text-muted mb-2">First Name</label>
                    <input
                      type="text"
                      value={accountSettings.firstName}
                      onChange={(e) => setAccountSettings({...accountSettings, firstName: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Last Name</label>
                    <input
                      type="text"
                      value={accountSettings.lastName}
                      onChange={(e) => setAccountSettings({...accountSettings, lastName: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Email</label>
                    <input
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Phone</label>
                    <input
                      type="tel"
                      value={accountSettings.phone}
                      onChange={(e) => setAccountSettings({...accountSettings, phone: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Timezone</label>
                    <select
                      value={accountSettings.timezone}
                      onChange={(e) => setAccountSettings({...accountSettings, timezone: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Language</label>
                    <select
                      value={accountSettings.language}
                      onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-main">Security Settings</h2>
                  <button
                    onClick={() => handleSave('security')}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors"
                  >
                    <SaveIcon className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                      >
                        {showPassword ? <VisibilityOffIcon className="w-5 h-5" /> : <VisibilityIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-muted mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green pr-10"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                      >
                        {showNewPassword ? <VisibilityOffIcon className="w-5 h-5" /> : <VisibilityIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-muted mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green pr-10"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon className="w-5 h-5" /> : <VisibilityIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-bg-main rounded-lg border border-border-dark">
                    <div>
                      <h3 className="font-medium text-text-main">Two-Factor Authentication</h3>
                      <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
                    </div>
                    <ToggleButton
                      enabled={securitySettings.twoFactorAuth}
                      onChange={(enabled) => setSecuritySettings({...securitySettings, twoFactorAuth: enabled})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-text-muted mb-2">Session Timeout (minutes)</label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-main">Notification Preferences</h2>
                  <button
                    onClick={() => handleSave('notifications')}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors"
                  >
                    <SaveIcon className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>

                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-bg-main rounded-lg border border-border-dark">
                      <div>
                        <h3 className="font-medium text-text-main">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {key.includes('email') && 'Receive notifications via email'}
                          {key.includes('push') && 'Receive push notifications'}
                          {key.includes('sms') && 'Receive SMS notifications'}
                          {key.includes('transaction') && 'Get notified about transaction updates'}
                          {key.includes('security') && 'Get notified about security events'}
                          {key.includes('marketing') && 'Receive marketing and promotional emails'}
                          {key.includes('weekly') && 'Receive weekly financial reports'}
                        </p>
                      </div>
                      <ToggleButton
                        enabled={value}
                        onChange={(enabled) => setNotificationSettings({...notificationSettings, [key]: enabled})}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-main">App Preferences</h2>
                  <button
                    onClick={() => handleSave('preferences')}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors"
                  >
                    <SaveIcon className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Theme</label>
                    <select
                      value={preferenceSettings.theme}
                      onChange={(e) => setPreferenceSettings({...preferenceSettings, theme: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Currency</label>
                    <select
                      value={preferenceSettings.currency}
                      onChange={(e) => setPreferenceSettings({...preferenceSettings, currency: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Date Format</label>
                    <select
                      value={preferenceSettings.dateFormat}
                      onChange={(e) => setPreferenceSettings({...preferenceSettings, dateFormat: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-2">Time Format</label>
                    <select
                      value={preferenceSettings.timeFormat}
                      onChange={(e) => setPreferenceSettings({...preferenceSettings, timeFormat: e.target.value})}
                      className="w-full px-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                    >
                      <option value="12-hour">12-hour</option>
                      <option value="24-hour">24-hour</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-bg-main rounded-lg border border-border-dark">
                    <div>
                      <h3 className="font-medium text-text-main">Auto Logout</h3>
                      <p className="text-sm text-text-muted">Automatically log out after inactivity</p>
                    </div>
                    <ToggleButton
                      enabled={preferenceSettings.autoLogout}
                      onChange={(enabled) => setPreferenceSettings({...preferenceSettings, autoLogout: enabled})}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-bg-main rounded-lg border border-border-dark">
                    <div>
                      <h3 className="font-medium text-text-main">Data Export</h3>
                      <p className="text-sm text-text-muted">Allow data export functionality</p>
                    </div>
                    <ToggleButton
                      enabled={preferenceSettings.dataExport}
                      onChange={(enabled) => setPreferenceSettings({...preferenceSettings, dataExport: enabled})}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 