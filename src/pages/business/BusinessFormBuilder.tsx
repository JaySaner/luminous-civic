import React, { useState, useEffect } from 'react';
import { BusinessLayout } from '@/components/business/BusinessLayout';
import { useBusinessContext } from '@/components/business/BusinessContext';
import { FormFieldEditor } from '@/components/business/FormFieldEditor';
import { FormFieldRenderer } from '@/components/business/FormFieldRenderer';
import { generateAIFormFields } from '@/lib/business/businessAI';
import { saveCustomForm, listCustomForms } from '@/lib/business/businessDb';
import type { CustomForm, FormField } from '@/lib/business/types';
import { 
  FileSpreadsheet, 
  Plus, 
  Sparkles, 
  Save, 
  Eye, 
  CheckCircle2, 
  Loader2,
  Wand2
} from 'lucide-react';

export const BusinessFormBuilder: React.FC = () => {
  const { business } = useBusinessContext();
  const [form, setForm] = useState<CustomForm | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState('Public Issue & Feedback Form');
  const [formDesc, setFormDesc] = useState('Please fill out the form below to report an incident or provide feedback.');

  const [saving, setSaving] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [message, setMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (!business?.id) return;
    async function loadForm() {
      try {
        const forms = await listCustomForms(business!.id);
        if (forms.length > 0) {
          setForm(forms[0]);
          setFormTitle(forms[0].title);
          setFormDesc(forms[0].description || '');
          setFields(forms[0].fields);
        } else {
          // Initialize with standard default fields
          setFields([
            { id: 'f_title', label: 'Issue Title / Subject', type: 'text', required: true, placeholder: 'Briefly describe the issue' },
            { id: 'f_category', label: 'Category', type: 'select', required: true, options: ['Maintenance', 'Sanitation', 'Service Quality', 'Billing', 'Safety'] },
            { id: 'f_desc', label: 'Detailed Description', type: 'textarea', required: true, placeholder: 'Provide complete context...' },
            { id: 'f_rating', label: 'Overall Experience Rating', type: 'rating', required: false },
            { id: 'f_photo', label: 'Upload Photo Evidence', type: 'file', required: false }
          ]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadForm();
  }, [business?.id]);

  const handleAddField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `f_${Date.now()}`,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      type,
      required: false,
      placeholder: ''
    };
    setFields(prev => [...prev, newField]);
  };

  const handleUpdateField = (index: number, updated: FormField) => {
    setFields(prev => prev.map((f, i) => i === index ? updated : f));
  };

  const handleDeleteField = (index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFields.length) return;
    const temp = newFields[index];
    newFields[index] = newFields[targetIndex];
    newFields[targetIndex] = temp;
    setFields(newFields);
  };

  const handleGenerateAIFields = async () => {
    if (!business) return;
    setAiGenerating(true);
    setMessage('');
    try {
      const generated = await generateAIFormFields(business.industryType, aiPrompt || 'General customer reporting and maintenance requests');
      setFields(generated);
      setMessage('AI generated modern form field structure tailored for ' + business.industryType);
    } catch (e) {
      console.error(e);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSaveForm = async () => {
    if (!business?.id) return;
    setSaving(true);
    setMessage('');
    try {
      const formToSave: CustomForm = {
        id: form?.id || `form_${business.id}`,
        businessId: business.id,
        title: formTitle,
        description: formDesc,
        fields,
        isPublished: true,
        createdAt: form?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await saveCustomForm(formToSave);
      setForm(formToSave);
      setMessage('Public portal form structure saved and published successfully!');
    } catch (e: any) {
      console.error(e);
      setMessage('Error saving form: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <BusinessLayout>
      <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Dynamic Form Engine
            </span>
            <h1 className="text-2xl font-extrabold text-white">Public Portal Form Builder</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition ${
                previewMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              <Eye className="w-4 h-4" /> {previewMode ? 'Exit Preview' : 'Live Preview'}
            </button>
            <button
              onClick={handleSaveForm}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-950/50 transition active:scale-95 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Publish Form
            </button>
          </div>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> {message}
          </div>
        )}

        {/* AI Form Assistant Callout */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-blue-800/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Gemini AI Form Architect</h3>
          </div>
          <p className="text-xs text-slate-300">
            Automatically generate optimized complaint or feedback fields tailored to your industry (<strong className="text-cyan-400">{business?.industryType}</strong>).
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. Guest room maintenance and room service complaint form"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleGenerateAIFields}
              disabled={aiGenerating}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              {aiGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generate Fields with AI
            </button>
          </div>
        </div>

        {/* Builder Workspace */}
        {previewMode ? (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">{formTitle}</h2>
              <p className="text-xs text-slate-400 mt-1">{formDesc}</p>
            </div>
            <div className="space-y-5">
              {fields.map((f) => (
                <FormFieldRenderer key={f.id} field={f} value="" onChange={() => {}} />
              ))}
            </div>
            <button type="button" className="w-full py-3.5 rounded-xl bg-cyan-600 text-white font-bold text-sm shadow-lg">
              Submit Report (Preview Mode)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Settings & Field List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Form Information</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Form Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Form Description / Instructions</label>
                  <textarea
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Dynamic Fields List */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Form Fields ({fields.length})</h3>
                {fields.map((field, idx) => (
                  <FormFieldEditor
                    key={field.id}
                    field={field}
                    onUpdate={(updated) => handleUpdateField(idx, updated)}
                    onDelete={() => handleDeleteField(idx)}
                    onMoveUp={idx > 0 ? () => handleMove(idx, 'up') : undefined}
                    onMoveDown={idx < fields.length - 1 ? () => handleMove(idx, 'down') : undefined}
                  />
                ))}
              </div>
            </div>

            {/* Field Toolbox */}
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl sticky top-24 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" /> Add Form Field
                </h3>
                <p className="text-xs text-slate-400">Click any field type below to insert it into your form structure:</p>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleAddField('text')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Single Line Text
                  </button>
                  <button
                    onClick={() => handleAddField('textarea')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Multi-Line Textarea
                  </button>
                  <button
                    onClick={() => handleAddField('select')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Dropdown Select
                  </button>
                  <button
                    onClick={() => handleAddField('rating')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Star Rating (1-5 Stars)
                  </button>
                  <button
                    onClick={() => handleAddField('file')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Photo / Evidence Upload
                  </button>
                  <button
                    onClick={() => handleAddField('email')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Contact Email Field
                  </button>
                  <button
                    onClick={() => handleAddField('phone')}
                    className="w-full text-left px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
                  >
                    + Contact Phone Field
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};
