"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Suspense, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

export type SettingsTab = {
	value: string;
	label: string;
	description?: string;
	content: ReactNode;
	disabled?: boolean;
};

export interface SettingsTabsShellProps {
	tabs: SettingsTab[];
	defaultTab?: string;
	queryParam?: string;
	title?: string;
	description?: string;
	navHeader?: ReactNode;
	navFooter?: ReactNode;
	className?: string;
}

export function SettingsTabsShell({
	...props
}: SettingsTabsShellProps) {
	return (
		<Suspense fallback={<SettingsTabsShellFallback {...props} />}>
			<SettingsTabsShellContent {...props} />
		</Suspense>
	);
}

function SettingsTabsShellFallback({
	tabs,
	defaultTab,
	title,
	description,
	navHeader,
	navFooter,
	className,
}: SettingsTabsShellProps) {
	const enabledTabs = tabs.filter((tab) => !tab.disabled);
	const fallbackTab = defaultTab ?? enabledTabs[0]?.value ?? tabs[0]?.value;
	const activeTabConfig = tabs.find((tab) => tab.value === fallbackTab);

	if (tabs.length === 0) {
		return null;
	}

	return (
		<section
			className={cn(
				"grid gap-6 lg:grid-cols-[16rem_1fr] lg:items-start",
				className,
			)}
		>
			<aside className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				{navHeader && <div className="mb-4">{navHeader}</div>}

				<nav className="space-y-1" aria-label={title ?? "Settings sections"}>
					{tabs.map((tab) => {
						const isActive = tab.value === fallbackTab;

						return (
							<div
								key={tab.value}
								className={cn(
									"block w-full rounded-md px-3 py-2 text-left transition-colors",
									tab.disabled && "opacity-50",
									isActive
										? "bg-[#F4F3FE] text-[#605DEC]"
										: "text-gray-700",
								)}
							>
								<span className="block text-sm font-medium">{tab.label}</span>
								{tab.description && (
									<span
										className={cn(
											"mt-0.5 block text-xs",
											isActive ? "text-[#605DEC]" : "text-gray-500",
										)}
									>
										{tab.description}
									</span>
								)}
							</div>
						);
					})}
				</nav>

				{navFooter && <div className="mt-4">{navFooter}</div>}
			</aside>

			<div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
				{(title || description || activeTabConfig) && (
					<div className="mb-5 border-b border-gray-200 pb-4">
						{title && <p className="text-sm font-medium text-[#605DEC]">{title}</p>}
						<h2 className="mt-1 text-xl font-semibold text-gray-900">
							{activeTabConfig?.label}
						</h2>
						{description && (
							<p className="mt-2 max-w-2xl text-sm text-gray-600">
								{description}
							</p>
						)}
					</div>
				)}

				<div>{activeTabConfig?.content}</div>
			</div>
		</section>
	);
}

function SettingsTabsShellContent({
	tabs,
	defaultTab,
	queryParam = "tab",
	title,
	description,
	navHeader,
	navFooter,
	className,
}: SettingsTabsShellProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const enabledTabs = tabs.filter((tab) => !tab.disabled);
	const fallbackTab = defaultTab ?? enabledTabs[0]?.value ?? tabs[0]?.value;
	const requestedTab = searchParams.get(queryParam);
	const activeTab =
		enabledTabs.find((tab) => tab.value === requestedTab)?.value ?? fallbackTab;
	const activeTabConfig = tabs.find((tab) => tab.value === activeTab);

	const tabHref = useMemo(() => {
		return (tabValue: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(queryParam, tabValue);
			return `${pathname}?${params.toString()}`;
		};
	}, [pathname, queryParam, searchParams]);

	if (tabs.length === 0) {
		return null;
	}

	return (
		<section
			className={cn(
				"grid gap-6 lg:grid-cols-[16rem_1fr] lg:items-start",
				className,
			)}
		>
			<aside className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				{navHeader && <div className="mb-4">{navHeader}</div>}

				<nav className="space-y-1" aria-label={title ?? "Settings sections"}>
					{tabs.map((tab) => {
						const isActive = tab.value === activeTab;
						const itemClassName = cn(
							"block w-full rounded-md px-3 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50",
							isActive
								? "bg-[#F4F3FE] text-[#605DEC]"
								: "text-gray-700 hover:bg-gray-50 hover:text-gray-950",
						);

						return tab.disabled ? (
							<button
								key={tab.value}
								type="button"
								disabled
								className={itemClassName}
							>
								<span className="block text-sm font-medium">{tab.label}</span>
								{tab.description && (
									<span
										className={cn(
											"mt-0.5 block text-xs",
											isActive ? "text-[#605DEC]" : "text-gray-500",
										)}
									>
										{tab.description}
									</span>
								)}
							</button>
						) : (
							<Link
								key={tab.value}
								href={tabHref(tab.value)}
								replace
								scroll={false}
								aria-current={isActive ? "page" : undefined}
								className={itemClassName}
							>
								<span className="block text-sm font-medium">{tab.label}</span>
								{tab.description && (
									<span
										className={cn(
											"mt-0.5 block text-xs",
											isActive ? "text-[#605DEC]" : "text-gray-500",
										)}
									>
										{tab.description}
									</span>
								)}
							</Link>
						);
					})}
				</nav>

				{navFooter && <div className="mt-4">{navFooter}</div>}
			</aside>

			<div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
				{(title || description || activeTabConfig) && (
					<div className="mb-5 border-b border-gray-200 pb-4">
						{title && <p className="text-sm font-medium text-[#605DEC]">{title}</p>}
						<h2 className="mt-1 text-xl font-semibold text-gray-900">
							{activeTabConfig?.label}
						</h2>
						{description && (
							<p className="mt-2 max-w-2xl text-sm text-gray-600">
								{description}
							</p>
						)}
					</div>
				)}

				<div>{activeTabConfig?.content}</div>
			</div>
		</section>
	);
}
