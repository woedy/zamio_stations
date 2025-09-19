import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  X
} from 'lucide-react';
import api from '../../lib/api';

interface StationStaff {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  permission_level: string;
  emergency_contact?: string;
  emergency_phone?: string;
  hire_date?: string;
  employee_id?: string;
  department?: string;
  can_upload_playlogs: boolean;
  can_manage_streams: boolean;
  can_view_analytics: boolean;
  active: boolean;
  station_name: string;
  created_at: string;
}

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  permission_level: string;
  emergency_contact: string;
  emergency_phone: string;
  hire_date: string;
  employee_id: string;
  department: string;
  can_upload_playlogs: boolean;
  can_manage_streams: boolean;
  can_view_analytics: boolean;
}

const StationStaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<StationStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StationStaff | null>(null);
  const [pagination, setPagination] = useState({
    page_number: 1,
    total_pages: 1,
    total_count: 0,
    next: null,
    previous: null
  });

  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'presenter',
    permission_level: 'view',
    emergency_contact: '',
    emergency_phone: '',
    hire_date: '',
    employee_id: '',
    department: '',
    can_upload_playlogs: false,
    can_manage_streams: false,
    can_view_analytics: true
  });

  const roleChoices = [
    { value: 'manager', label: 'Station Manager' },
    { value: 'producer', label: 'Producer' },
    { value: 'presenter', label: 'Presenter' },
    { value: 'dj', label: 'DJ' },
    { value: 'engineer', label: 'Sound Engineer' },
    { value: 'admin', label: 'Administrator' },
    { value: 'compliance_officer', label: 'Compliance Officer' }
  ];

  const permissionChoices = [
    { value: 'view', label: 'View Only' },
    { value: 'edit', label: 'Edit' },
    { value: 'admin', label: 'Administrator' }
  ];

  const stationId = localStorage.getItem('station_id') || '';

  const loadStaff = async (page = 1) => {
    if (!stationId) {
      setError('Station ID not found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = {
        station_id: stationId,
        page: page.toString(),
        page_size: '10'
      };

      if (searchQuery) {
        params.search = searchQuery;
      }
      if (roleFilter) {
        params.role = roleFilter;
      }

      const response = await api.get('/api/stations/get-station-staff-list/', { params });
      
      if (response.data.message === 'Successful') {
        setStaff(response.data.data.staff);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to load staff');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, [stationId, searchQuery, roleFilter]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'presenter',
      permission_level: 'view',
      emergency_contact: '',
      emergency_phone: '',
      hire_date: '',
      employee_id: '',
      department: '',
      can_upload_playlogs: false,
      can_manage_streams: false,
      can_view_analytics: true
    });
  };

  const handleAddStaff = () => {
    resetForm();
    setEditingStaff(null);
    setShowAddModal(true);
  };

  const handleEditStaff = (staffMember: StationStaff) => {
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone || '',
      role: staffMember.role,
      permission_level: staffMember.permission_level,
      emergency_contact: staffMember.emergency_contact || '',
      emergency_phone: staffMember.emergency_phone || '',
      hire_date: staffMember.hire_date || '',
      employee_id: staffMember.employee_id || '',
      department: staffMember.department || '',
      can_upload_playlogs: staffMember.can_upload_playlogs,
      can_manage_streams: staffMember.can_manage_streams,
      can_view_analytics: staffMember.can_view_analytics
    });
    setEditingStaff(staffMember);
    setShowAddModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        station_id: stationId
      };

      if (editingStaff) {
        payload.staff_id = editingStaff.id.toString();
        await api.post('/api/stations/edit-station-staff/', payload);
      } else {
        await api.post('/api/stations/add-station-staff/', payload);
      }

      setShowAddModal(false);
      resetForm();
      setEditingStaff(null);
      await loadStaff();
    } catch (err: any) {
      setError(err.response?.data?.errors ? 
        Object.values(err.response.data.errors).flat().join(', ') : 
        'Failed to save staff member'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (staffMember: StationStaff) => {
    try {
      await api.post('/api/stations/activate-station-staff/', {
        staff_id: staffMember.id.toString(),
        active: !staffMember.active
      });
      await loadStaff(pagination.page_number);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update staff status');
    }
  };

  const handleArchiveStaff = async (staffMember: StationStaff) => {
    if (!confirm(`Are you sure you want to archive ${staffMember.name}?`)) {
      return;
    }

    try {
      await api.post('/api/stations/archive-station-staff/', {
        staff_id: staffMember.id.toString()
      });
      await loadStaff(pagination.page_number);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to archive staff member');
    }
  };

  const getRoleLabel = (role: string) => {
    const roleChoice = roleChoices.find(r => r.value === role);
    return roleChoice ? roleChoice.label : role;
  };

  const getPermissionLabel = (permission: string) => {
    const permChoice = permissionChoices.find(p => p.value === permission);
    return permChoice ? permChoice.label : permission;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-400" />
              Staff Management
            </h1>
            <p className="text-gray-300 mt-2">Manage your station's staff members and their permissions</p>
          </div>
          <button
            onClick={handleAddStaff}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Staff Member
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search staff members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                {roleChoices.map(role => (
                  <option key={role.value} value={role.value} className="bg-slate-800">
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Staff List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading staff...
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-12 text-gray-300">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              <p>No staff members found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Permissions</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {staff.map((member) => (
                    <tr key={member.id} className="hover:bg-white/5">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          {member.employee_id && (
                            <div className="text-sm text-gray-400">ID: {member.employee_id}</div>
                          )}
                          {member.department && (
                            <div className="text-sm text-gray-400">{member.department}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getRoleLabel(member.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-300">
                            <Mail className="w-4 h-4 mr-1" />
                            {member.email}
                          </div>
                          {member.phone && (
                            <div className="flex items-center text-gray-400 mt-1">
                              <Phone className="w-4 h-4 mr-1" />
                              {member.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-300">{getPermissionLabel(member.permission_level)}</div>
                          <div className="flex gap-1 mt-1">
                            {member.can_upload_playlogs && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                                Upload
                              </span>
                            )}
                            {member.can_manage_streams && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-800">
                                Streams
                              </span>
                            )}
                            {member.can_view_analytics && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                Analytics
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditStaff(member)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleActive(member)}
                            className={`p-1 ${member.active ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`}
                            title={member.active ? 'Deactivate' : 'Activate'}
                          >
                            {member.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleArchiveStaff(member)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Archive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {staff.length} of {pagination.total_count} staff members
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => loadStaff(pagination.page_number - 1)}
                  disabled={!pagination.previous}
                  className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-gray-300">
                  Page {pagination.page_number} of {pagination.total_pages}
                </span>
                <button
                  onClick={() => loadStaff(pagination.page_number + 1)}
                  disabled={!pagination.next}
                  className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Staff Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role *
                      </label>
                      <select
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {roleChoices.map(role => (
                          <option key={role.value} value={role.value} className="bg-slate-800">
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Employment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        value={formData.employee_id}
                        onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Hire Date
                      </label>
                      <input
                        type="date"
                        value={formData.hire_date}
                        onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        value={formData.emergency_contact}
                        onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.emergency_phone}
                        onChange={(e) => setFormData({ ...formData, emergency_phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Permissions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Permission Level
                    </label>
                    <select
                      value={formData.permission_level}
                      onChange={(e) => setFormData({ ...formData, permission_level: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {permissionChoices.map(perm => (
                        <option key={perm.value} value={perm.value} className="bg-slate-800">
                          {perm.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Specific Permissions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-300">Specific Permissions</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.can_upload_playlogs}
                          onChange={(e) => setFormData({ ...formData, can_upload_playlogs: e.target.checked })}
                          className="mr-2 rounded"
                        />
                        <span className="text-gray-300">Can upload playlogs</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.can_manage_streams}
                          onChange={(e) => setFormData({ ...formData, can_manage_streams: e.target.checked })}
                          className="mr-2 rounded"
                        />
                        <span className="text-gray-300">Can manage stream links</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.can_view_analytics}
                          onChange={(e) => setFormData({ ...formData, can_view_analytics: e.target.checked })}
                          className="mr-2 rounded"
                        />
                        <span className="text-gray-300">Can view analytics</span>
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-400/30 text-red-200 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
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
                      {editingStaff ? 'Update' : 'Add'} Staff Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationStaffManagement;