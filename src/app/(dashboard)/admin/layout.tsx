import AdminSidebar from "@/components/admin/sidebar";
import { AuthGuard } from "@/components/auth/auth-guard";
import { RoleGuard } from "@/components/auth/role-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={["admin" as never]}>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <main className="flex-1 lg:ml-0">
            <div className="container mx-auto p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
}
