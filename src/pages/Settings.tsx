import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Palette, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  emailNotifications: boolean;
  projectUpdates: boolean;
  applicationAlerts: boolean;
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  emailNotifications: true,
  projectUpdates: true,
  applicationAlerts: true,
  profileVisibility: 'public',
  showEmail: false,
};

function loadSettings(): AppSettings {
  try {
    const saved = localStorage.getItem('findamproject-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export default function Settings() {
  const { currentUser } = useAuth();
  const { setTheme: applyTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('findamproject-settings', JSON.stringify(settings));
  }, [settings]);

  const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    if (key === 'theme') applyTheme(value as 'dark' | 'light' | 'system');
  };

  const handleSave = () => {
    localStorage.setItem('findamproject-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <SettingsIcon size={48} className="mx-auto text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to access settings</h2>
          <p className="text-gray-400 mb-6">Customize your experience.</p>
          <Link to="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
          <p className="text-gray-400">Manage your preferences</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Appearance */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Palette size={20} className="text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: 'dark' as const, icon: <Moon size={16} />, label: 'Dark' },
                  { value: 'light' as const, icon: <Sun size={16} />, label: 'Light' },
                  { value: 'system' as const, icon: <Monitor size={16} />, label: 'System' },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update('theme', opt.value)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                      settings.theme === opt.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Bell size={20} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            {([
              { key: 'emailNotifications' as const, label: 'Email notifications', desc: 'Receive email updates about your account' },
              { key: 'projectUpdates' as const, label: 'Project updates', desc: 'Get notified when projects you follow are updated' },
              { key: 'applicationAlerts' as const, label: 'Application alerts', desc: 'Get notified about application status changes' },
            ]).map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-medium">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
                <button
                  onClick={() => update(item.key, !settings[item.key])}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    settings[item.key] ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Shield size={20} className="text-green-400" />
            <h2 className="text-lg font-semibold text-white">Privacy</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Profile visibility</label>
              <div className="grid grid-cols-2 gap-3">
                {(['public', 'private'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update('profileVisibility', opt)}
                    className={`py-3 rounded-lg text-sm font-medium transition-all capitalize ${
                      settings.profileVisibility === opt
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-medium">Show email on profile</div>
                <div className="text-gray-500 text-xs">Let other users see your email address</div>
              </div>
              <button
                onClick={() => update('showEmail', !settings.showEmail)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings.showEmail ? 'bg-purple-600' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    settings.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
