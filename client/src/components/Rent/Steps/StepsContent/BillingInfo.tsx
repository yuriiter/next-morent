import React from "react";
import { StepInput } from "../StepInput";
import { PartialRentCarForm, RentCarForm } from "../types";
import { FormErrors, RegisterFunction } from "@/hooks/forms/types";

type BillingInfoProps = {
  register: RegisterFunction<RentCarForm>;
  errors: FormErrors<RentCarForm>;
};

const billingInfoInputs: PartialRentCarForm = {
  name: {
    label: "Name",
    placeholder: "Your name",
  },
  phoneNumber: {
    label: "Phone number",
    placeholder: "Phone number",
  },
  address: {
    label: "Address",
    placeholder: "Address",
  },
  townOrCity: {
    label: "Town/City",
    placeholder: "Town or city",
  },
} as const;

export const BillingInfo = ({ register, errors }: BillingInfoProps) => {
  return (
    <div className="step__content billing-info">
      {Object.entries(billingInfoInputs).map(
        ([name, { label, placeholder }]) => {
          const { value, ...rest } = register(name as keyof RentCarForm);

          return (
            <StepInput
              key={name}
              label={label}
              placeholder={placeholder}
              {...rest}
              value={value as string}
              error={errors[name as keyof RentCarForm]}
            />
          );
        }
      )}
    </div>
  );
};
