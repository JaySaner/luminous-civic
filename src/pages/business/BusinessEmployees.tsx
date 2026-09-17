import React, { useState, useEffect } from 'react';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { EmptyState } from '@/components/business/EmptyState';
import { listEmployees, createEmployee, listDepartments } from '@/lib/business/businessDb';
import { registerBusinessUser } from '@/lib/business/businessAuth';
import type { BusinessEmployee, BusinessDepartment, BusinessUserRole } from '@/lib/business/types';
import { Users, UserPlus, Shield, Mail, CheckCircle2, Loader2 } from 'lucide-react';

export const BusinessEmployees: React.FC = () => {
  const { business } = useBusinessContext();
  const [employees, setEmployees] = useState<BusinessEmployee[]>([]);
  const [departments, setDepartments] = useState<BusinessDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<BusinessUserRole>('staff');
  const [departmentId, setDepartmentId] = useState('');
  const [adding, setAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!business?.id) return;
    loadData();
  }, [business?.id]);

  async function loadData() {
    setLoading(true);
    try {
      const empData = await listEmployees(business!.id);
      setEmployees(empData);
      const deptData = await listDepartments(business!.id);
      setDepartments(deptData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!business?.id || !name || !email || !password) return;
    setAdding(true);
    try {
      // 1. Create Firebase Auth account for staff user
      const bUser = await registerBusinessUser(
        email,
        password,
        name,
        business.id,
        role,
        departmentId || undefined
      );

      // 2. Create Employee record
      const emp = await createEmployee({
        businessId: business.id,
        uid: bUser.uid,
        name,
        email,
        role,
        departmentId: departmentId || undefined,
        departmentName: departments.find(d => d.id === departmentId)?.name,
        status: 'active'
      });

      setEmployees(prev => [...prev, emp]);
      setName('');
      setEmail('');
      setPassword('');
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create staff account.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <BusinessLayout>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Staff Roster & User Accounts</h1>
            <p className="text-sm text-slate-400">Manage employee accounts, role privileges, and department assignments.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-950/40 transition active:scale-95"
          >
            <UserPlus className="w-4 h-4" /> Onboard Staff Member
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading staff directory...</div>
        ) : employees.length === 0 ? (
          <EmptyState
            title="No Staff Onboarded Yet"
            description="Add your department managers and resolution staff to start assigning incoming issues."
            actionLabel="Onboard Staff Member"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Staff Member</th>
                  <th className="py-4 px-5">Role</th>
                  <th className="py-4 px-5">Department</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5 font-semibold text-white flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <div>{emp.name}</div>
                        <div className="text-xs text-slate-400 font-normal">{emp.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${
                        emp.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        emp.role === 'manager' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                        'bg-slate-500/10 text-slate-300 border-slate-500/20'
                      }`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-300">{emp.departmentName || 'General'}</td>
                    <td className="py-4 px-5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {emp.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <h3 className="text-lg font-bold text-white">Onboard Staff Member</h3>
              
              {error && <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-semibold">{error}</div>}

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. David Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="david@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Initial Account Password *
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      User Role *
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                    >
                      <option value="staff">Staff Member</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <select
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
                    >
                      <option value="">General</option>
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={adding}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg"
                  >
                    {adding ? 'Provisioning...' : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};
