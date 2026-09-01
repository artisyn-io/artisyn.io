import { RoleGuard } from "@/components/auth/role-guard";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RoleGuard allowedRoles={["client"]}>
			<div className='flex min-h-screen bg-gray-50'>
				{/* Main Content */}
				<main className='flex-1'>
					<div className='container mx-auto p-6 lg:p-8'>{children}</div>
				</main>
			</div>
		</RoleGuard>
	);
}
