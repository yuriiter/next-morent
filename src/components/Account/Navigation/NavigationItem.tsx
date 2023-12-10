import React from "react";
import Link from "next/link";
import { NavigationItemData } from ".";
import { cn } from "@/utils";
import { useIsOnRoute } from "@/hooks/useIsOnRoute";

type NavigationItemProps = NavigationItemData & {
  className?: string;
};

export const NavigationItem = ({
  icon,
  label,
  path,
  component,
  className,
}: NavigationItemProps) => {
  const isActive = useIsOnRoute([path]);

  return (
    component || (
      <Link
        href={path}
        className={cn([
          "navigation-group__item",
          isActive && "navigation-group__item--active",
          className,
        ])}
      >
        {icon}
        {label}
      </Link>
    )
  );
};