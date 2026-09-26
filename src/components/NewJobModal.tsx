import React, { useState } from 'react';
import { TutoringJob } from '../types';
import { X, Plus, Sparkles } from 'lucide-react';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Omit<TutoringJob, 'id' | 'postedDate' | 'status'>) => void;
}

export const NewJobModal: React.FC<NewJobModalProps> = ({ isOpen, onClose, onAddJob }) => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('Grade 12 (Natural Science)');
  const [subject, setSubject] = useState('Mathematics & Physics');
  const [location, setLocation] = useState('Bole Atlas, Addis Ababa');
  const [rate, setRate] = useState('500 ETB / hour (16 hrs/month)');
  const [monthlyEstimate, setMonthlyEstimate] = useState('8000');
  const [schedule, setSchedule] = useState('Mon, Wed, Fri afternoons');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddJob({
      title,
      grade,
      subject,
      location,
      rate,
      monthlyEstimate: parseFloat(monthlyEstimate) || 8000,
      schedule,
      description: description || `Tutorial placement for ${grade} in ${location}.`,
    });

    onClose();
  };

  const fillQuickPreset = () => {
    setTitle('Grade 10 General Science & Math Tutor');
    setGrade('Grade 10 (Secondary)');
    setSubject('Chemistry, Biology & Mathematics');
    setLocation('Bisrate Gabriel / Sarbet, Addis Ababa');
    setRate('450 ETB / hour (18 hrs/month)');
    setMonthlyEstimate('8100');
    setSchedule('Tuesday, Thursday, Saturday 4:00 PM');
    setDescription('Friendly family looking for a dedicated university graduate or professional tutor to guide a 10th-grade student through regional curriculum and term exams.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Post New Tutoring Job Opening</h3>
            <p className="text-xs text-slate-500">
              Create a new student request. It will appear live for tutors to apply.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={fillQuickPreset}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Fill Quick Addis Ababa Preset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Job Title <span className="text-rose-500 font-bold ml-1">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grade 12 National University Exam Physics Prep"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Grade / Academic Level <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g. Grade 12 (Natural Science)"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Subject(s) <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mathematics & Physics"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Location in Addis Ababa <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. CMC Michael / Bole Atlas"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Est. Monthly Earnings (ETB) <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                type="number"
                required
                value={monthlyEstimate}
                onChange={(e) => setMonthlyEstimate(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Rate Description <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 500 ETB / hr (16 hrs/mo)"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Schedule Details <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                required
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="e.g. Mon, Wed, Fri • 4:30 PM"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Job Description &amp; Requirements
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe student goals, syllabus focus, and tutor expectations..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Publish Job Opening
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
