import React from 'react';
import type { FormField } from '@/lib/business/types';
import { Star, Upload } from 'lucide-react';

interface FormFieldRendererProps {
  field: FormField;
  value: any;
  onChange: (val: any) => void;
  error?: string;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  value,
  onChange,
  error
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {field.label} {field.required && <span className="text-rose-400">*</span>}
      </label>

      {field.type === 'text' && (
        <input
          type="text"
          placeholder={field.placeholder || ''}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
        />
      )}

      {field.type === 'textarea' && (
        <textarea
          placeholder={field.placeholder || ''}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
        />
      )}

      {field.type === 'email' && (
        <input
          type="email"
          placeholder={field.placeholder || 'email@example.com'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
        />
      )}

      {field.type === 'phone' && (
        <input
          type="tel"
          placeholder={field.placeholder || '+1 (555) 000-0000'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
        />
      )}

      {field.type === 'select' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
        >
          <option value="">Select option...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === 'rating' && (
        <div className="flex items-center gap-2 p-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`p-2 rounded-xl transition ${
                (value || 0) >= star ? 'text-amber-400 bg-amber-500/10' : 'text-slate-600 hover:text-slate-400'
              }`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
          <span className="text-xs text-slate-400 font-semibold ml-2">
            {value ? `${value} / 5 Stars` : 'Select rating'}
          </span>
        </div>
      )}

      {field.type === 'file' && (
        <div className="border-2 border-dashed border-slate-800 rounded-2xl p-4 text-center bg-slate-950/60 hover:border-cyan-500/50 transition">
          <Upload className="w-6 h-6 mx-auto text-cyan-400 mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (ev) => onChange(ev.target?.result);
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-cyan-400 hover:file:bg-slate-700 cursor-pointer"
          />
          {value && (
            <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
              ✓ Attachment Loaded
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
};
