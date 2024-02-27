import React, { ChangeEvent } from "react";
import { SelectWrapper } from "./SelectWrapper";
import { SelectOption } from "./types";
import { Option } from "./Option";
import { useMQ } from "@/hooks/mediaQuery/useMQ";
import { NativeSelectInput } from "./NativeSelectInput";
import { Placement } from "@/types/common";

export type SelectProps = {
  placeholder?: string;
  value: SelectOption | undefined;
  onChange: (newValue: SelectOption | undefined) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
  placement?: Placement;
  forceUseNativeSelect?: boolean;
};

export const Select = ({
  placeholder,
  value,
  onChange,
  options,
  className,
  disabled = false,
  placement,
  forceUseNativeSelect = false,
}: SelectProps) => {
  const useNativeSelect = useMQ("MD", "max");

  if (forceUseNativeSelect || (useNativeSelect && !disabled)) {
    return (
      <NativeSelectInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        className={className}
        disabled={disabled}
      />
    );
  }

  return (
    <SelectWrapper
      value={typeof value === "string" ? value : value?.value}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      placement={placement}
    >
      <div className="select__options-wrapper">
        {options?.map((option) => {
          const selectOption = () => onChange(option);
          return (
            <Option
              key={typeof option === "string" ? option : option.value}
              isSelected={option === value}
              option={option}
              onClick={selectOption}
            />
          );
        })}
      </div>
    </SelectWrapper>
  );
};
