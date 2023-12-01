import type { PropsWithChildren, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import {
  ArrowDown,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUp,
  Calendar,
} from "lucide-react";
import { SortDirection } from "@tanstack/react-table";

export function Header({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={twMerge(
        "p-4 bg-bgLight h-10 flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SortableHeaderProps = {
  sortingType: "alphabetical" | "date";
  sortDirection: false | SortDirection;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
export function SortableHeader({
  sortingType,
  sortDirection,
  children,
  ...props
}: SortableHeaderProps) {
  return (
    <Header {...props}>
      {children}
      <div className="ml-2 bg-transparent">
        {sortingType === "alphabetical" &&
          (sortDirection === "desc" ? (
            <ArrowDownZA size={20} />
          ) : (
            sortDirection && <ArrowDownAZ size={20} />
          ))}
        {sortingType === "date" && <DateSortIcon direction={sortDirection} />}
      </div>
    </Header>
  );
}
export function DateSortIcon({
  direction,
}: {
  direction: SortableHeaderProps["sortDirection"];
}) {
  if (!direction) return null;
  return (
    <div className="relative">
      <Calendar size={20} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 ">
        {direction === "asc" ? (
          <ArrowUp size={12} strokeWidth={3} />
        ) : (
          <ArrowDown size={12} strokeWidth={3} />
        )}
      </div>
    </div>
  );
}
