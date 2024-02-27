import React from "react";
import { dateToString } from "./utils";
import { Calendar } from "./Calendar";
import { SelectWrapper } from "../SelectWrapper";
import { useMQ } from "@/hooks/mediaQuery/useMQ";
import { NativeDateInput } from "./NativeDateInput";
import { Placement } from "@/types/common";

export type DateInputProps = {
  placeholder?: string;
  min?: Date;
  max?: Date;
  value: Date | undefined;
  onChange: (newValue: Date) => void;
  className?: string;
  disabled?: boolean;
  placement?: Placement;
  forceUseNativeSelect?: boolean;
};

export const DateInput = ({
  placeholder,
  min = new Date(),
  max,
  value,
  onChange,
  className,
  disabled = false,
  placement,
  forceUseNativeSelect = false,
}: DateInputProps) => {
  const valueAsString = value ? dateToString(value) : value;
  const useNativeSelect = useMQ("MD", "max");

  if (forceUseNativeSelect || (useNativeSelect && !disabled)) {
    return (
      <NativeDateInput
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
    );
  }
  return (
    <SelectWrapper
      className={className}
      value={valueAsString}
      placeholder={placeholder}
      disabled={disabled}
      placement={placement}
    >
      <Calendar min={min} max={max} value={value} onChange={onChange} />
    </SelectWrapper>
  );
};
