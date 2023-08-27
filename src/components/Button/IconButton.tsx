import React, { cloneElement } from "react";
import { Button } from ".";
import { IconButtonProps } from "./types";

export const IconButton = ({
  className = "",
  children,
  size = "sm",
  ...rest
}: IconButtonProps) => {
  return (
    <Button
      {...rest}
      size={size}
      className={` "button--icon-only" ${className}`}
    >
      <div className="button__icon">{children}</div>
    </Button>
  );
};
