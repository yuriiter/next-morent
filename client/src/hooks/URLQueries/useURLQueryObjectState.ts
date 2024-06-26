import { useRouter } from "next/router";
import { SetStateAction, useCallback, useMemo } from "react";

const floatRegex = /^-?\d+(\.\d+)?$/;

const transformString = (value: string | string[] | undefined) => {
  if (value === "true" || value === "True" || value === "") return true;
  else if (value === "false" || value === "False") return false;
  else if (Array.isArray(value) || value === undefined) return value;
  else if (floatRegex.test(value)) return parseFloat(value);
  else return value;
};

export const useURLQueryObjectState = <T extends Record<string, unknown>>(
  initialValue: T
): [T, (newValueOrAction: SetStateAction<T>) => void] => {
  const router = useRouter();

  const getQueryValue = useCallback((): T => {
    const valueKeys = Object.keys(initialValue);
    const currentValue = valueKeys.reduce((acc, key) => {
      const query =
        typeof location !== "undefined"
          ? Object.fromEntries(new URLSearchParams(location.search).entries())
          : router.query;
      const value = query[key];
      if (value === undefined) return acc;

      return {
        ...acc,
        [key]: transformString(value ?? undefined),
      };
    }, {});

    return currentValue as T;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const currentState = useMemo(() => getQueryValue(), [getQueryValue]);

  const updateQuery = useCallback(
    (newValueOrAction: SetStateAction<T>) => {
      const newValue =
        typeof newValueOrAction !== "function"
          ? newValueOrAction
          : newValueOrAction(currentState);

      const keyValuePairsToSave = Object.entries({
        ...router.query,
        ...newValue,
      }).reduce((acc, [key, value]) => {
        if (value === undefined || value === initialValue[key]) {
          delete acc[key];
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string | number | string[]>);

      router.push(
        {
          pathname: window.location.pathname,
          query: keyValuePairsToSave,
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  return [currentState, updateQuery];
};
