import { useState, useEffect, useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import PdfReportSection from '../components/PdfReportSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { taskService } from '../services/taskService';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter !== 'all') {
      result = result.filter((t) => t.status === filter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((t) =>
        t.title.toLowerCase().includes(q)
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  const handleCreateTask = async (data) => {
    await taskService.createTask(data);
    fetchTasks();
  };

  const handleUpdateTask = async (data) => {
    if (!editTask) return;
    await taskService.updateTask(editTask._id, data);
    fetchTasks();
  };

  const handleDeleteTask = async () => {
    if (!deleteTask) return;
    try {
      await taskService.deleteTask(deleteTask._id);
      fetchTasks();
      setDeleteTask(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await taskService.completeTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete task');
    }
  };

  const openEditForm = (task) => {
    setEditTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTask(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header + Add Task */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-semibold text-xl text-surface-900">
              Your Tasks
            </h2>
            <p className="text-surface-600 text-sm mt-0.5">
              {filteredTasks.length} of {tasks.length} tasks
            </p>
          </div>
          <button
            onClick={() => {
              setEditTask(null);
              setFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all"
          >
            <FiPlus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {/* PDF Report Section */}
        <div className="mb-10">
          <PdfReportSection />
        </div>

        {/* Task Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/60 rounded-2xl border border-dashed border-surface-200">
            <p className="text-surface-600 font-medium">
              {tasks.length === 0
                ? 'No tasks yet. Create your first task!'
                : 'No tasks match your search or filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEditForm}
                onDelete={setDeleteTask}
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <TaskFormModal
        isOpen={formOpen}
        onClose={closeForm}
        onSubmit={editTask ? handleUpdateTask : handleCreateTask}
        task={editTask}
      />
      <DeleteConfirmModal
        isOpen={!!deleteTask}
        onClose={() => setDeleteTask(null)}
        onConfirm={handleDeleteTask}
        task={deleteTask}
      />
    </div>
  );
};

export default HomePage;
