import React from 'react';
import type { FormField } from '@/lib/business/types';
import { Trash2, MoveUp, MoveDown, Settings2 } from 'lucide-react';

interface FormFieldEditorProps {
  field: FormField;
  onUpdate: (updated: FormField) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const FormFieldEditor: React.FC<FormFieldEditorProps> = ({
  field,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{field.type} Field</span>
        </div>
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <button onClick={onMoveUp} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
              <MoveUp className="w-3.5 h-3.5" />
            </button>
          )}
          {onMoveDown && (
            <button onClick={onMoveDown} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
              <MoveDown className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={onDelete} className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Field Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ ...field, label: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Field Type</label>
          <select
            value={field.type}
            onChange={(e) => onUpdate({ ...field, type: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="text">Single Line Text</option>
            <option value="textarea">Multi-Line Text</option>
            <option value="email">Email Address</option>
            <option value="phone">Phone Number</option>
            <option value="select">Dropdown Select</option>
            <option value="rating">Star Rating (1-5)</option>
            <option value="file">Photo Upload</option>
          </select>
        </div>
      </div>

      {field.type === 'select' && (
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Dropdown Options (Comma Separated)</label>
          <input
            type="text"
            value={field.options?.join(', ') || ''}
            onChange={(e) => onUpdate({ ...field, options: e.target.value.split(',').map(s => s.trim()) })}
            placeholder="Option 1, Option 2, Option 3"
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id={`req_${field.id}`}
          checked={field.required}
          onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
          className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
        />
        <label htmlFor={`req_${field.id}`} className="text-xs text-slate-300 font-medium cursor-pointer">
          Required Field
        </label>
      </div>
    </div>
  );
};
