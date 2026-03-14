import { FiSearch } from 'react-icons/fi';

const Navbar = ({ searchQuery, onSearchChange, filter, onFilterChange }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-surface-200 shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 py-4 sm:items-center sm:justify-between">
          <h1 className="font-display font-bold text-2xl sm:text-3xl bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Todo Manager
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-800/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 bg-white focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-surface-200 bg-white focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all font-medium"
            >
              <option value="all">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
