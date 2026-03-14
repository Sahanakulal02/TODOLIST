import { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { taskService } from '../services/taskService';
import { generateTaskReportPDF } from '../utils/pdfGenerator';

const PdfReportSection = () => {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date must be before or equal to end date');
      return;
    }

    setLoading(true);
    try {
      const { data } = await taskService.getReportTasks(startDate, endDate);
      generateTaskReportPDF(data, startDate, endDate);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-surface-200/80 overflow-hidden">
      <div className="px-6 py-4 border-b border-surface-200 bg-surface-50/50">
        <h3 className="font-display font-semibold text-lg text-surface-900 flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-primary-600" />
          PDF Report
        </h3>
        <p className="text-sm text-surface-600 mt-0.5">
          Generate a report of tasks within a date range
        </p>
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-surface-800 mb-1.5"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-surface-800 mb-1.5"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FiFileText className="w-4 h-4" />
              Generate PDF Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PdfReportSection;
