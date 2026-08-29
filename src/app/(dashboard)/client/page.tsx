export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Client Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your projects and discover artisans.
        </p>
      </header>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-600">
          Welcome to your client workspace. This area is restricted to client
          accounts only.
        </p>
      </section>
    </div>
  );
}
