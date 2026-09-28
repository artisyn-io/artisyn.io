## Summary

Adds a single shared `EmptyState` component and replaces the ad-hoc "nothing here yet" markup that had accumulated across the app with it.

Closes #114

## What changed

### New component

`src/components/ui/empty-state.tsx` — a `EmptyState` component with the slots the issue asks for:

| Prop | Purpose |
| --- | --- |
| `title` | Short headline explaining why the area is empty (required). |
| `description` | Optional supporting copy telling the user what to do next. Accepts `ReactNode`. |
| `icon` | Optional leading icon. The wrapper normalises its size via `[&_svg]:size-6`, so callers just pass a `lucide-react` icon without sizing classes. |
| `action` | Primary call-to-action slot. |
| `secondaryAction` | Optional secondary call-to-action slot. |
| `bordered` | `true` (default) renders a standalone dashed card; `false` renders a bare block for use inside an existing panel. |
| `titleAs` | Element used for the title (`"p"` default, `"h2"`, `"h3"`) so adopting pages keep their existing heading order. |
| `className` | Escape hatch merged through the repo's existing `cn()` helper. |

The `action` / `secondaryAction` slots are deliberately `ReactNode` rather than a built-in button. The component never needs to know about routing, wallet state, or data fetching — a page passes its own `Button`, `Link` or `<button>`.

### Adoption — 9 routes, 14 call sites

Every replacement is a real page that was previously rendering its own inline empty markup:

| Route | File | What was replaced |
| --- | --- | --- |
| `/artisan/dashboard` | `src/app/(dashboard)/artisan/dashboard/page.tsx` | Local `EmptyMetrics`, "No performance data available.", "No active jobs at the moment." |
| `/artisan/earnings` | `src/app/(dashboard)/artisan/earnings/page.tsx` | Local `EmptyTransactions` |
| `/artisan/listings`, `/artisan/jobs` | `.../listings/(components)/TabPages.tsx` | The file-local `EmptyState` helper (deleted) used for the Active Jobs tab |
| `/artisan/listings` | `.../listings/(components)/AppliedJobsList.tsx` | "No applied jobs yet." |
| `/artisan/listings` | `.../listings/(components)/CompletedJobsList.tsx` | "No completed jobs yet." |
| `/artisan/listings`, `/artisan/jobs` | `.../listings/(components)/JobCard.tsx` | "No jobs match your filters" |
| `/search` | `src/app/search/page.tsx` | "No artisans match this search yet." |
| `/client/applications` | `src/app/(dashboard)/client/applications/page.tsx` | "No applications yet." |
| `/client/dashboard` | `src/app/(dashboard)/client/dashboard/page.tsx` | "No applications received yet" |
| `/artisan/help` | `src/app/(dashboard)/artisan/help/page.tsx` | "No results found for …" |
| `/` | `src/features/landing-page/search-grid-section.tsx` | "No artisans found in this category." |

## Design decisions and judgement calls

**Dashed card vs. inline block (`bordered`).** Roughly half of the existing empty states render *inside* a panel that already has its own border and padding (the "Active Jobs" section on the artisan dashboard, the earnings transaction table, the listings tabs). A component that always draws a dashed card would double the chrome there. `bordered={false}` drops the container so the state inherits its host panel, and `className` re-supplies the host's own padding where it differed.

**`titleAs` rather than a fixed heading tag.** The existing empty states are inconsistent — the search page used an `<h2>`, the client dashboard an `<h3>`, and the rest plain `<p>`s. Collapsing them all onto one tag would have been a silent accessibility regression on the two pages that already had a heading. `titleAs` preserves each page's heading order; `p` is the default because it is the dominant existing pattern.

**Icons are the one thing that is not a slot.** The `icon` slot takes a bare icon node and the wrapper normalises its size, because the previous markup was inconsistent about it (`w-12 h-12 text-gray-300` in two places, `w-6 h-6` inside a hand-rolled circle in a third). The wrapper's `aria-hidden` means decorative icons are never announced.

**Colour.** The app has drifted across `gray-*`, `slate-*` and a shadcn-ish `#020817`/`#605DEC`/`#64748B` palette. The component ships on the `gray-*` ramp because that is what the majority of the replaced empty states already used, and lets the two outliers (search, client dashboard) tune via `className` and the icon slot. Unifying every colour ramp across the app is a much larger change and is out of scope here.

**Extra CTAs.** Four of the adopted states had no call to action, or told the user what to do in prose only. Since the issue asks for a CTA slot, the obvious next action is now a real link/button: browse jobs from the dashboard, clear search from `/search` and the landing page, contact support from `/artisan/help`. These reuse the existing link styling on each page rather than introducing the shadcn `Button` into pages that do not currently use it.

**Not touched:** error and retry states (`ErrorBanner` in the dashboard and earnings pages, the inline error blocks in the listings lists). They are a different concern from "empty", and the issue asks specifically for empty states.

## Acceptance criteria

- [x] **Empty state component is reusable across pages.** `EmptyState` has no page-specific or data-fetching knowledge; `action` / `secondaryAction` / `icon` are `ReactNode` slots, `bordered`, `titleAs` and `className` cover the layout variation, and it is exported from `src/components/ui/` alongside the existing primitives.
- [x] **At least 4 existing pages adopt the shared component.** 9 routes adopt it across 11 files, at 14 call sites (see the table above) — well past the minimum.

## Verification

Repo commands, taken from `package.json` (`dev`, `build`, `start`, `lint`). There is no `test` or `typecheck` script, so `npx tsc --noEmit` was run directly for the type check.

Run from the repository root on Node v24.18.1 / pnpm 12.6.0.

```
$ pnpm lint
$ eslint
LINT EXIT: 0
```

```
$ npx tsc --noEmit
TSC EXIT: 0
```

```
$ pnpm build
...
├ ○ /artisan/listings
├ ○ /client/applications
├ ○ /client/dashboard
├ ○ /contact
├ ○ /search
└ ○ /terms


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

BUILD EXIT: 0
```

Note for reviewers running the type check on a fresh clone: `next-env.d.ts` is gitignored and is only generated by `next build` / `next dev`. `npx tsc --noEmit` before either of those will report pre-existing `TS2307` errors for the `bg.png` imports; run `pnpm build` first.

All three commands were also confirmed green on `upstream/main` before this change, so the results above reflect this PR and not pre-existing breakage.

## Limitations

- No automated tests are added: the repository has no test runner and no `test` script, so there is nothing to hook into. Verification is lint, type check and build.
- The `gray-*` / `slate-*` colour split between older and newer pages is inherited, not resolved.
- This PR does not touch the error/retry states, which are separate from empty states.

closes #114
