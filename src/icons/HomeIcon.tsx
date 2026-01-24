export function HomeIcon({
	size = 18,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}>
			<path
				d='M7.55246 2.11513L2.35496 6.27762C1.76996 6.74262 1.39495 7.72514 1.52245 8.46014L2.51996 14.4301C2.69996 15.4951 3.71995 16.3576 4.79995 16.3576H13.2C14.2725 16.3576 15.3 15.4876 15.48 14.4301L16.4775 8.46014C16.5975 7.72514 16.2225 6.74262 15.645 6.27762L10.4474 2.12263C9.64495 1.47763 8.34746 1.47763 7.55246 2.11513Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				opacity='0.4'
				d='M9 11.625C10.0355 11.625 10.875 10.7855 10.875 9.75C10.875 8.71447 10.0355 7.875 9 7.875C7.96447 7.875 7.125 8.71447 7.125 9.75C7.125 10.7855 7.96447 11.625 9 11.625Z'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
