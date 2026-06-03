export default function DashboardLoading() {
  return (
    <div
      className="flex min-h-screen bg-gray-50"
      role="status"
      aria-label="Loading"
    >
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-200 p-5 space-y-4 animate-pulse">
        {/* Logo */}
        <div className="h-10 w-28 rounded-lg bg-gray-200 mb-4" />
        {/* Nav items */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 p-6 lg:p-8 animate-pulse">
        {/* Page header */}
        <div className="space-y-2 mb-8">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-4 w-72 rounded bg-gray-100" />
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-white border border-gray-200"
            />
          ))}
        </div>

        {/* Content block */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-full rounded-xl bg-white border border-gray-200"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
