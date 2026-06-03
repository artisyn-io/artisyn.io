export default function AuthLoading() {
  return (
    <div
      className="flex min-h-screen bg-white"
      role="status"
      aria-label="Loading"
    >
      {/* Left panel skeleton */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:pl-56 lg:px-0 py-8 space-y-6 animate-pulse">
        {/* Logo */}
        <div className="h-16 w-16 rounded-2xl bg-gray-200" />

        {/* Heading */}
        <div className="space-y-3">
          <div className="h-7 w-2/3 rounded-lg bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-100" />
        </div>

        {/* Card skeletons */}
        <div className="space-y-4 pt-2">
          <div className="h-20 w-full rounded-2xl border border-gray-200 bg-gray-100" />
          <div className="h-20 w-full rounded-2xl border border-gray-200 bg-gray-100" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 w-40 rounded-lg bg-gray-200" />
      </div>

      {/* Right panel — hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-100" />
    </div>
  );
}
