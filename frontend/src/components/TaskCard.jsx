import { FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { formatDate } from '../utils/dateUtils';

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div
      className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-surface-200/80 group ${
        isCompleted ? 'opacity-90' : ''
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className={`font-display font-semibold text-lg text-surface-900 flex-1 ${
              isCompleted ? 'line-through text-surface-800/70' : ''
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              isCompleted
                ? 'bg-primary-100 text-primary-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {task.status}
          </span>
        </div>

        {task.description && (
          <p className="text-surface-800/80 text-sm mb-4 line-clamp-3">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-surface-800/60 mb-4">
          <span>Created: {formatDate(task.createdDate)}</span>
          {task.completedDate && (
            <span>Completed: {formatDate(task.completedDate)}</span>
          )}
        </div>

        <div className="flex gap-2 pt-2 border-t border-surface-200/60">
          {!isCompleted && (
            <button
              onClick={() => onComplete(task._id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm transition-colors"
              title="Mark as completed"
            >
              <FiCheckCircle className="w-4 h-4" />
              Complete
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-surface-200/80 hover:bg-surface-200 text-surface-800 font-medium text-sm transition-colors"
            title="Edit task"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm transition-colors"
            title="Delete task"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
