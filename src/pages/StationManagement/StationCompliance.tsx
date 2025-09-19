import React, { useEffect, useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  Globe, 
  Radio, 
  Users, 
  Link as LinkIcon,
  Save,
  Loader2,
  ExternalLink
} from 'lucide-react';
import api from '../../lib/api';

interface ComplianceData {
  station_info: {
    station_id: string;
    name: string;
    regulatory_body?: string;
    compliance_contact_name?: string;
    compliance_contact_email?: string;
    compliance_contact_phone?: string;
    license_number?: string;
    verification_status: string;
    verified_at?: string;
    verification_notes?: string;
    station_class: string;
    station_type: string;
    coverage_area?: string;
    estimated_listeners?: number;
  };
  staff_count: number;
  stream_links_count: number;
  compliance_checklist: {
    license_number_provided: boolean;
    regulatory_body_specified: boolean;
    compliance_contact_provided: boolean;
    operating_hours_specified: boolean;
    broadcast_frequency_provided: boolean;
    staff_assigned: boolean;
    stream_links_configured: boolean;
  };
  compliance_score: number;
  completed_items: number;
  total_items: number;
}

interface ComplianceFormData {
  regulatory_body: string;
  compliance_contact_name: string;
  compliance_contact_email: string;
  compliance_contact_phone: string;
  license_number: string;
  operating_hours_start: string;
  operating_hours_end: string;
  timezone: string;
  website_url: string;
  broadcast_frequency: string;
  transmission_power: string;
  social_media_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

const StationCompliance: React.FC = () => {
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState<ComplianceFormData>({
    regulatory_body: '',
    compliance_contact_name: '',
    compliance_contact_email: '',
    compliance_contact_phone: '',
    license_number: '',
    operating_hours_start: '',
    operating_hours_end: '',
    timezone: 'Africa/Accra',
    website_url: '',
    broadcast_frequency: '',
    transmission_power: '',
    social_media_links: {}
  });

  const stationId = localStorage.getItem('station_id') || '';

  const loadComplianceData = async () => {
    if (!stationId) {
      setError('Station ID not found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/stations/get-station-compliance-report/', {
        params: { station_id: stationId }
      });

      if (response.data.message === 'Compliance report generated successfully') {
        setComplianceData(response.data.data);
        
        // Populate form with existing data
        const stationInfo = response.data.data.station_info;
        setFormData({
          regulatory_body: stationInfo.regulatory_body || '',
          compliance_contact_name: stationInfo.compliance_contact_name || '',
          compliance_contact_email: stationInfo.compliance_contact_email || '',
          compliance_contact_phone: stationInfo.compliance_contact_phone || '',
          license_number: stationInfo.license_number || '',
          operating_hours_start: '',
          operating_hours_end: '',
          timezone: 'Africa/Accra',
          website_url: '',
          broadcast_frequency: '',
          transmission_power: '',
          social_media_links: {}
        });
      } else {
        setError('Failed to load compliance data');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplianceData();
  }, [stationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.post('/api/stations/update-station-compliance/', {
        station_id: stationId,
        ...formData
      });

      setEditing(false);
      await loadComplianceData();
    } catch (err: any) {
      setError(err.response?.data?.errors ? 
        Object.values(err.response.data.errors).flat().join(', ') : 
        'Failed to update compliance information'
      );
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'suspended':
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading compliance data...
        </div>
      </div>
    );
  }

  if (!complianceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
        <div className="text-center py-12 text-red-300">
          Failed to load compliance data
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Shield className="w-8 h-8 mr-3 text-green-400" />
              Station Compliance
            </h1>
            <p className="text-gray-300 mt-2">Manage regulatory compliance and verification status</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
          >
            {editing ? 'Cancel' : 'Edit Compliance Info'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compliance Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verification Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                {getStatusIcon(complianceData.station_info.verification_status)}
                <span className="ml-2">Verification Status</span>
              </h2>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Current Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complianceData.station_info.verification_status)}`}>
                  {complianceData.station_info.verification_status.charAt(0).toUpperCase() + complianceData.station_info.verification_status.slice(1)}
                </span>
              </div>

              {complianceData.station_info.verified_at && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Verified Date:</span>
                  <span className="text-white">
                    {new Date(complianceData.station_info.verified_at).toLocaleDateString()}
                  </span>
                </div>
              )}

              {complianceData.station_info.verification_notes && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Verification Notes:</h4>
                  <p className="text-gray-300 text-sm">{complianceData.station_info.verification_notes}</p>
                </div>
              )}
            </div>

            {/* Compliance Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Compliance Information
              </h2>

              {editing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Regulatory Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Regulatory Body
                      </label>
                      <input
                        type="text"
                        value={formData.regulatory_body}
                        onChange={(e) => setFormData({ ...formData, regulatory_body: e.target.value })}
                        placeholder="e.g., GHAMRO, COSGA"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={formData.license_number}
                        onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Compliance Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Compliance Contact Name
                      </label>
                      <input
                        type="text"
                        value={formData.compliance_contact_name}
                        onChange={(e) => setFormData({ ...formData, compliance_contact_name: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Compliance Contact Email
                      </label>
                      <input
                        type="email"
                        value={formData.compliance_contact_email}
                        onChange={(e) => setFormData({ ...formData, compliance_contact_email: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Compliance Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.compliance_contact_phone}
                        onChange={(e) => setFormData({ ...formData, compliance_contact_phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Technical Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Broadcast Frequency
                      </label>
                      <input
                        type="text"
                        value={formData.broadcast_frequency}
                        onChange={(e) => setFormData({ ...formData, broadcast_frequency: e.target.value })}
                        placeholder="e.g., 101.5 FM"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Transmission Power
                      </label>
                      <input
                        type="text"
                        value={formData.transmission_power}
                        onChange={(e) => setFormData({ ...formData, transmission_power: e.target.value })}
                        placeholder="e.g., 10kW"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Operating Hours Start
                      </label>
                      <input
                        type="time"
                        value={formData.operating_hours_start}
                        onChange={(e) => setFormData({ ...formData, operating_hours_start: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Operating Hours End
                      </label>
                      <input
                        type="time"
                        value={formData.operating_hours_end}
                        onChange={(e) => setFormData({ ...formData, operating_hours_end: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Africa/Accra" className="bg-slate-800">Africa/Accra (GMT)</option>
                        <option value="UTC" className="bg-slate-800">UTC</option>
                      </select>
                    </div>
                  </div>

                  {/* Website URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://yourstation.com"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center"
                    >
                      {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400">Regulatory Body:</span>
                      <p className="text-white">{complianceData.station_info.regulatory_body || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">License Number:</span>
                      <p className="text-white">{complianceData.station_info.license_number || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Station Class:</span>
                      <p className="text-white">{complianceData.station_info.station_class}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Station Type:</span>
                      <p className="text-white">{complianceData.station_info.station_type}</p>
                    </div>
                  </div>
                  
                  {complianceData.station_info.compliance_contact_name && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Compliance Contact:</h4>
                      <p className="text-white">{complianceData.station_info.compliance_contact_name}</p>
                      {complianceData.station_info.compliance_contact_email && (
                        <p className="text-gray-300">{complianceData.station_info.compliance_contact_email}</p>
                      )}
                      {complianceData.station_info.compliance_contact_phone && (
                        <p className="text-gray-300">{complianceData.station_info.compliance_contact_phone}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Compliance Score & Checklist */}
          <div className="space-y-6">
            {/* Compliance Score */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Score</h3>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getComplianceColor(complianceData.compliance_score)}`}>
                  {complianceData.compliance_score}%
                </div>
                <p className="text-gray-300 mt-2">
                  {complianceData.completed_items} of {complianceData.total_items} items completed
                </p>
              </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Checklist</h3>
              <div className="space-y-3">
                {Object.entries(complianceData.compliance_checklist).map(([key, completed]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {completed ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-gray-300">Staff Members</span>
                  </div>
                  <span className="text-white font-medium">{complianceData.staff_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">Stream Links</span>
                  </div>
                  <span className="text-white font-medium">{complianceData.stream_links_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Radio className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-gray-300">Coverage Area</span>
                  </div>
                  <span className="text-white font-medium">
                    {complianceData.station_info.coverage_area || 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCompliance;