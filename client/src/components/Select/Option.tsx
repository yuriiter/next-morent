import React from "react";
import { OptionProps } from "./types";
import { useDropdownContext } from "./useDropdownContext";
import { cn } from "@/utils";

export const Option = ({
  onClick,
  option,
  isSelected,
  disabled,
}: OptionProps) => {
  const { setDropdownOpen } = useDropdownContext();

  const onSelectOption = () => {
    if (disabled) return;
    setDropdownOpen(false);
    onClick();
  };

  return (
    <div
      className={cn([
        "select__option-wrapper",
        isSelected && "select__option-wrapper--selected",
        disabled && "select__option-wrapper--disabled",
      ])}
      onClick={onSelectOption}
    >
      <span className="select__option">
        {typeof option !== "string" ? (
          <>
            <span>{option.label}</span>
            <span>{option.icon}</span>
          </>
        ) : (
          <span>{option}</span>
        )}
      </span>
    </div>
  );
};
