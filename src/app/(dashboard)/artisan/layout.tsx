import Sidebar from "@/components/artisan/sidebar";

export default function ArtisanLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen bg-gray-50'>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<main className='flex-1 lg:ml-0'>
				<div className='container mx-auto p-6 lg:p-8'>{children}</div>
			</main>
		</div>
	);
}
