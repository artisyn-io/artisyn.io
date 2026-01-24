import { cn } from "../../lib/utils";

type ArtisanBadgeProps = {
  icon: React.ReactNode;
  name: string;
  isActive?: boolean;
  onClick: () => void;
};

export function ArtisanBadge({
  icon,
  name,
  isActive,
  onClick,
}: ArtisanBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "min-w-29.25 shrink-0 text-[14px] hover:shadow-[#605DEC] hover:transition-shadow shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[#020817] inline-flex cursor-pointer items-center gap-4 justify-center py-3 px-4 rounded-xl  border border-[#E2E8F0]",
        isActive && "shadow-[#605DEC]",
      )}
    >
      {icon}
      {name}
    </button>
  );
}
