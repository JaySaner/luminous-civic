import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FormFieldRenderer } from '@/components/business/FormFieldRenderer';
import { getBusinessBySlug, listCustomForms, submitPublicReport } from '@/lib/business/businessDb';
import { analyzeBusinessReportAI } from '@/lib/business/businessAI';
import type { Business, CustomForm, FormField } from '@/lib/business/types';
import { Building2, Send, Search, Sparkles, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PublicReportingPortal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [business, setBusiness] = useState<Business | null>(null);
  const [form, setForm] = useState<CustomForm | null>(null);
  const [loading, setLoading] = useState(true);

  // Form Field State
  const [values, setValues] = useState<Record<string, any>>({});
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    async function loadPortal() {
      try {
        const b = await getBusinessBySlug(slug!);
        if (b) {
          setBusiness(b);
          const forms = await listCustomForms(b.id);
          if (forms.length > 0) {
            setForm(forms[0]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadPortal();
  }, [slug]);

  const handleFieldChange = (fieldId: string, val: any) => {
    setValues(prev => ({ ...prev, [fieldId]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setError('');
    setSubmitting(true);

    try {
      // Run AI Analysis in background for automated triage
      const title = values['f_title'] || values['subject'] || values['issueType'] || 'Public Submission';
      const desc = values['f_desc'] || values['description'] || JSON.stringify(values);
      const photo = values['f_photo'] || values['images'];

      const aiAnalysis = await analyzeBusinessReportAI(
        title,
        desc,
        typeof photo === 'string' ? photo : undefined,
        business.industryType
      );

      // Submit Public Report and Auto-Create Issue
      const res = await submitPublicReport(
        business.id,
        form?.id || 'default_form',
        values,
        {
          name: reporterName,
          email: reporterEmail,
          phone: reporterPhone,
          anonymous
        },
        aiAnalysis,
        aiAnalysis.priority
      );

      // Navigate to Success Page with tracking number
      navigate(`/portal/success/${res.issue.trackingNumber}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to submit report. Please check your form input.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mb-4" />
        <p className="text-sm font-medium">Loading Public Portal...</p>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Portal Not Found</h2>
        <p className="text-sm text-slate-400 max-w-sm mb-6">The requested business portal code "/portal/{slug}" does not exist or has been deactivated.</p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-slate-800 text-cyan-400 font-semibold text-xs">
          Return to Main Civic Portal
        </Link>
      </div>
    );
  }

  // Default fallback fields if no custom form created yet
  const displayFields: FormField[] = form?.fields || [
    { id: 'f_title', label: 'Subject / Incident Title', type: 'text', required: true, placeholder: 'Summarize your report' },
    { id: 'f_category', label: 'Issue Category', type: 'select', required: true, options: ['Maintenance & Facilities', 'Cleanliness & Sanitation', 'Staff / Customer Service', 'Safety & Security', 'General Feedback'] },
    { id: 'f_desc', label: 'Detailed Description', type: 'textarea', required: true, placeholder: 'Provide full details, location inside facility, or timestamps...' },
    { id: 'f_rating', label: 'Overall Satisfaction Rating', type: 'rating', required: false },
    { id: 'f_photo', label: 'Upload Photo Evidence', type: 'file', required: false }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-16">
      {/* Top Banner Header */}
      <header className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-xl px-6 py-6 sticky top-0 z-30 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shadow-md" />
            ) : (
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg">
                {business.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">{business.name}</h1>
              <p className="text-xs text-slate-400 font-medium">Public Feedback & Resolution Portal</p>
            </div>
          </div>

          <Link
            to={`/portal/track`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-semibold text-xs transition"
          >
            <Search className="w-3.5 h-3.5" /> Track Submitted Issue
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto mt-8 px-6 space-y-8 animate-fade-in">
        {/* Intro Hero Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 md:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Direct Support Line
          </span>
          <h2 className="text-2xl font-extrabold text-white">{form?.title || 'Report an Issue or Feedback'}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{form?.description || 'Submit your concern directly to management. Every report is assigned a unique tracking number and monitored under strict resolution SLAs.'}</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-xl space-y-6">
          {/* Dynamic Form Fields */}
          <div className="space-y-6">
            {displayFields.map((field) => (
              <FormFieldRenderer
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={(val) => handleFieldChange(field.id, val)}
              />
            ))}
          </div>

          {/* Contact Details & Anonymous Toggle */}
          <div className="pt-6 border-t border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Your Contact Details (Optional)</h3>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                />
                Submit Anonymously
              </label>
            </div>

            {!anonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={reporterEmail}
                    onChange={(e) => setReporterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-950/50 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting & Analyzing Report...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> Submit Report to Management
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};
