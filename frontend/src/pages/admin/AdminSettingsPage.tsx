import React, { useState, useEffect } from 'react';
import {
  Building2,
  Phone,
  Percent,
  Save,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import api from '../../services/api';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    restaurantName: 'ROYAL FEAST',
    tagline: 'An Extraordinary Dining Experience',
    phone: '+91 98765 43210',
    email: 'concierge@royalfeast.com',
    address: '42 Imperial Boulevard, Heritage Quarter, New Delhi',
    openingHours: 'Mon - Sun: 12:00 PM - 11:30 PM',
    taxPercentage: 5.0,
    deliveryFeeFlat: 50.0,
    freeDeliveryOver: 999.0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setSavedSuccess(false);
      setErrorMessage('');

      const res = await api.put('/admin/settings', settings);
      if (res.data.success) {
        setSettings(res.data.data);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
          Platform Configuration
        </span>
        <h1 className="text-3xl font-serif text-white mt-1">Restaurant Settings & Policies</h1>
        <p className="text-sm text-neutral-400">
          Establish foundational business metadata, service hours, GST taxation, and delivery thresholds.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Restaurant parameters successfully updated across all modules.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Identity */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-serif text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#C6A15B]" />
            Establishment Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Restaurant Title
              </label>
              <input
                type="text"
                value={settings.restaurantName}
                onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
              Physical Heritage Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
            />
          </div>
        </div>

        {/* Communications & Hours */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-serif text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#C6A15B]" />
            Communications & Service Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Concierge Phone Line
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Official Inquiries Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
              Dining Hours Schedule
            </label>
            <input
              type="text"
              value={settings.openingHours}
              onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
            />
          </div>
        </div>

        {/* Commercial & Taxation Policy */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-serif text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Percent className="w-5 h-5 text-[#C6A15B]" />
            Taxation & Fulfillment Tariffs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                GST Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.taxPercentage}
                onChange={(e) =>
                  setSettings({ ...settings, taxPercentage: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Standard Chauffeur Delivery Fee (₹)
              </label>
              <input
                type="number"
                value={settings.deliveryFeeFlat}
                onChange={(e) =>
                  setSettings({ ...settings, deliveryFeeFlat: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Complimentary Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.freeDeliveryOver}
                onChange={(e) =>
                  setSettings({ ...settings, freeDeliveryOver: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="gold" disabled={isSaving} className="px-8">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Preserving Changes...' : 'Save Configuration'}
          </Button>
        </div>
      </form>
    </div>
  );
};
