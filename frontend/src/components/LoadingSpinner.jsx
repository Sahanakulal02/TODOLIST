const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    <p className="mt-4 text-surface-600 font-medium">Loading tasks...</p>
  </div>
);

export default LoadingSpinner;
