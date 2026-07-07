export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-green-600"></div>

        {/* Text */}
        <p className="text-sm text-slate-500">Loading, please wait...</p>
      </div>
    </div>
  );
}
