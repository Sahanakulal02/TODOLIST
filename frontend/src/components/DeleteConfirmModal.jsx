import { FiAlertTriangle } from 'react-icons/fi';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, task }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-red-100">
            <FiAlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-surface-900">
              Delete Task?
            </h3>
            <p className="text-sm text-surface-600">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {task && (
          <p className="text-surface-800 mb-4 truncate">
            &quot;{task.title}&quot;
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-surface-200 hover:bg-surface-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
