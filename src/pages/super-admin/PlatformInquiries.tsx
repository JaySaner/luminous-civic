import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuperAdminLayout } from '@/components/business/SuperAdminLayout';
import { EmptyState } from '@/components/business/EmptyState';
import { 
  listBusinessInquiries, 
  updateBusinessInquiryStatus, 
  deleteBusinessInquiry 
} from '@/lib/business/businessDb';
import type { BusinessInquiry, InquiryStatus } from '@/lib/business/types';
import { 
  Building2, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Trash2, 
  ArrowRight,
  Clock,
  MessageSquare,
  MapPin,
  Send
} from 'lucide-react';

export const PlatformInquiries: React.FC = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<BusinessInquiry[]>([]);
  const [filtered, setFiltered] = useState<BusinessInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
    setLoading(true);
    try {
      const data = await listBusinessInquiries();
      setInquiries(data);
      setFiltered(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let result = inquiries;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        i =>
          i.companyName.toLowerCase().includes(term) ||
          i.fullName.toLowerCase().includes(term) ||
          i.workEmail.toLowerCase().includes(term) ||
          i.industry.toLowerCase().includes(term) ||
          i.phone.includes(term)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(i => i.status === statusFilter);
    }
    setFiltered(result);
  }, [searchTerm, statusFilter, inquiries]);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await updateBusinessInquiryStatus(id, newStatus);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    setSuccessMsg(`Inquiry status updated to ${newStatus}`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    await deleteBusinessInquiry(id);
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const handleConvertToTenant = (inquiry: BusinessInquiry) => {
    // Mark as converted
    handleStatusChange(inquiry.id, 'converted');
    // Pre-fill CreateBusiness form via state navigation
    navigate('/super-admin/businesses/new', {
      state: {
        prefill: {
          name: inquiry.companyName,
          adminName: inquiry.fullName,
          adminEmail: inquiry.workEmail,
          phone: inquiry.phone,
          industryType: inquiry.industry === 'hospital' ? 'Hospital & Healthcare' : inquiry.industry === 'campus' ? 'Education & Campus' : 'Corporate & IT Parks',
        }
      }
    });
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#2447E8]/10 text-[#2447E8] border border-[#2447E8]/30">New Lead</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">Contacted</span>;
      case 'converted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#079669]/20 text-[#079669] border border-[#079669]/40">Converted Tenant</span>;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Enterprise Sales & Demo Inquiries
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Business Platform Inquiries</h1>
            <p className="text-sm text-slate-400">Review demo requests submitted from the Business & Industry landing page and convert leads into active tenants.</p>
          </div>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search company, name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Inquiry Statuses</option>
              <option value="new">New Leads</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted Tenants</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading business inquiries...</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No Inquiries Found"
            description="When users fill the Schedule Demo form on the Business Platform page, their submitted inquiries will appear here."
            actionLabel="Reset Search Filters"
            onAction={() => { setSearchTerm(''); setStatusFilter('all'); }}
          />
        ) : (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Organization & Contact</th>
                  <th className="py-4 px-5">Email & Phone</th>
                  <th className="py-4 px-5">Industry & Sites</th>
                  <th className="py-4 px-5">Submitted Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2447E8]/20 to-[#079669]/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30 text-sm shrink-0">
                          <Building2 className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-base">{inq.companyName}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-500" />
                            <span>{inq.fullName}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 font-mono text-cyan-300">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{inq.workEmail}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{inq.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="space-y-1 text-xs">
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-semibold block w-fit">
                          {inq.industry}
                        </span>
                        <div className="text-[11px] text-slate-400">
                          Sites: {inq.locationsCount || '1-5'}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      {getStatusBadge(inq.status)}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inq.status !== 'converted' && (
                          <button
                            onClick={() => handleConvertToTenant(inq)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow transition active:scale-95"
                            title="Onboard as Business Tenant"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Onboard Tenant</span>
                          </button>
                        )}

                        {inq.status === 'new' ? (
                          <button
                            onClick={() => handleStatusChange(inq.id, 'contacted')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold transition"
                            title="Mark as Contacted"
                          >
                            Mark Contacted
                          </button>
                        ) : inq.status === 'contacted' ? (
                          <button
                            onClick={() => handleStatusChange(inq.id, 'new')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 text-xs font-semibold transition"
                            title="Mark as New"
                          >
                            Mark New
                          </button>
                        ) : null}

                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                          title="Delete Inquiry"
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

      </div>
    </SuperAdminLayout>
  );
};

export default PlatformInquiries;
