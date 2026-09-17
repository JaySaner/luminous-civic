import React, { useState, useEffect } from 'react';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { EmptyState } from '@/components/business/EmptyState';
import { listDepartments, createDepartment } from '@/lib/business/businessDb';
import type { BusinessDepartment } from '@/lib/business/types';
import { Building2, Plus, Mail, Code, CheckCircle2, Shield } from 'lucide-react';

export const BusinessDepartments: React.FC = () => {
  const { business } = useBusinessContext();
  const [departments, setDepartments] = useState<BusinessDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  // New dept modal form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!business?.id) return;
    loadDepts();
  }, [business?.id]);

  async function loadDepts() {
    setLoading(true);
    try {
      const data = await listDepartments(business!.id);
      setDepartments(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business?.id || !name || !code) return;
    setAdding(true);
    try {
      const newDept = await createDepartment({
        businessId: business.id,
        name,
        code: code.toUpperCase(),
        email: email || undefined
      });
      setDepartments(prev => [...prev, newDept]);
      setName('');
      setCode('');
      setEmail('');
      setShowModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  };

  return (
    <BusinessLayout>
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Business Departments</h1>
            <p className="text-sm text-slate-400">Configure functional departments for issue routing and staff assignments.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-950/40 transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Department
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading departments...</div>
        ) : departments.length === 0 ? (
          <EmptyState
            title="No Departments Configured"
            description="Create your first department to organize incoming customer or internal issues."
            actionLabel="Add Department"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept) => (
              <div key={dept.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-950 text-cyan-400 border border-slate-800">
                    {dept.code}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{dept.name}</h3>
                  {dept.email && <p className="text-xs text-slate-400 font-medium mt-1">{dept.email}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <h3 className="text-lg font-bold text-white">Create New Department</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Department Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maintenance & Facilities"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Short Department Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MAINT"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm uppercase font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Notification Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="maint@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
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
                    {adding ? 'Saving...' : 'Create Department'}
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
