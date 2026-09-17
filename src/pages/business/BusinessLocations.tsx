import React, { useState, useEffect } from 'react';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { EmptyState } from '@/components/business/EmptyState';
import { listLocations, createLocation } from '@/lib/business/businessDb';
import type { BusinessLocation } from '@/lib/business/types';
import { MapPin, Plus } from 'lucide-react';

export const BusinessLocations: React.FC = () => {
  const { business } = useBusinessContext();
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [adding, setAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!business?.id) return;
    loadLocs();
  }, [business?.id]);

  async function loadLocs() {
    setLoading(true);
    try {
      const data = await listLocations(business!.id);
      setLocations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business?.id || !name) return;
    setAdding(true);
    try {
      const newLoc = await createLocation({
        businessId: business.id,
        name,
        address
      });
      setLocations(prev => [...prev, newLoc]);
      setName('');
      setAddress('');
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
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Branches & Locations</h1>
            <p className="text-sm text-slate-400">Manage physical facilities, branches, wards, or service zones.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-950/40 transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Location
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading locations...</div>
        ) : locations.length === 0 ? (
          <EmptyState
            title="No Locations Defined"
            description="Add your business branches or facilities to allow location-based report filing."
            actionLabel="Add Location"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {locations.map((loc) => (
              <div key={loc.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{loc.name}</h3>
                  {loc.address && <p className="text-xs text-slate-400 font-medium mt-1">{loc.address}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <h3 className="text-lg font-bold text-white">Add New Location / Branch</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Location Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. North Wing / Downtown Branch"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Street Address (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="123 Commercial Ave, Suite 400"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
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
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg"
                  >
                    {adding ? 'Saving...' : 'Add Location'}
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
