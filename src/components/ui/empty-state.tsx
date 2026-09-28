"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared empty state for pages, panels and list sections that have no content
 * to show yet.
 *
 * Everything is a slot: callers supply their own icon, description markup and
 * call to action (a `Button`, a `Link`, anything) so the component never has to
 * know about routing or data fetching. Use `bordered` to switch between a
 * standalone dashed card and an inline block that inherits an existing card's
 * padding.
 */
export interface EmptyStateProps {
  /** Short headline explaining why there is nothing to show. */
  title: string;
  /** Optional supporting copy telling the user what to do next. */
  description?: ReactNode;
  /** Optional leading icon. Its size is normalised by the wrapper. */
  icon?: ReactNode;
  /** Primary call to action, e.g. a `Button` or a `Link`. */
  action?: ReactNode;
  /** Optional secondary call to action rendered after the primary one. */
  secondaryAction?: ReactNode;
  /**
   * Renders the standalone dashed card container. Set to `false` when the
   * empty state already sits inside a bordered panel.
   */
  bordered?: boolean;
  /** Element used for the title, so callers can keep their heading order. */
  titleAs?: "h2" | "h3" | "p";
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  bordered = true,
  titleAs: TitleTag = "p",
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        bordered && "rounded-xl border border-dashed border-gray-200 bg-white",
        className,
      )}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className="mb-3 flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 [&_svg]:size-6"
        >
          {icon}
        </span>
      ) : null}

      <TitleTag className="text-base font-semibold text-gray-900">
        {title}
      </TitleTag>

      {description ? (
        <div className="mt-2 max-w-md text-sm text-gray-500">
          {description}
        </div>
      ) : null}

      {action || secondaryAction ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      ) : null}
    </div>
  );
}
