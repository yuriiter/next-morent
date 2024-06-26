import { useEffect, useRef, useState } from "react";

type UseFollowMouseTooltipParams = {
  followMouse: boolean;
};

export const useFollowMouseTooltip = ({
  followMouse,
}: UseFollowMouseTooltipParams) => {
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);
  const [leftTop, setLeftTop] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const { current: tooltipWrapper } = tooltipWrapperRef;
    if (!tooltipWrapper || !followMouse) {
      return;
    }

    const listener = (e: MouseEvent) => {
      const rect = tooltipWrapper.getBoundingClientRect();
      const tooltipLeft = e.clientX - rect.left;
      const tooltipTop = e.clientY - rect.top;

      setLeftTop([tooltipLeft, tooltipTop]);
    };

    tooltipWrapper.addEventListener("mousemove", listener);

    return () => tooltipWrapper.removeEventListener("mousemove", listener);
  }, [followMouse, tooltipWrapperRef]);

  return {
    leftTop,
    tooltipWrapperRef,
  };
};
