import { cn } from "@/utils";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
} from "react";

type DropdownPlacement =
  | "left-top"
  | "right-top"
  | "right-bottom"
  | "left-bottom";

type DropdownProps = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  placement?: DropdownPlacement;
};

type DropDownContextType = {
  dropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

export const DropdownContext = createContext<DropDownContextType>({
  dropdownOpen: false,
  setDropdownOpen: () => null,
});

export const Dropdown = ({
  children,
  open,
  setOpen,
  className,
  placement = "right-bottom",
}: DropdownProps) => {
  return (
    <DropdownContext.Provider
      value={{ dropdownOpen: open, setDropdownOpen: setOpen }}
    >
      <div
        tabIndex={open ? 0 : -1}
        className={cn([
          "select__dropdown",
          open && "select__dropdown--open",
          `select__dropdown--${placement}`,
          className,
        ])}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};