import { AxiosError, AxiosResponse } from "axios";
import {
  FetchError,
  FetchStatus,
  UseFetchParams,
  FetchCallback,
} from "@/types/fetchStatus";
import { useCallback, useEffect, useRef, useState } from "react";
import axios, { CancelTokenSource } from "axios";

export const useFetch = <T>({
  url,
  requestConfig,
  pause,
}: UseFetchParams): [FetchStatus<T>, FetchCallback<T>] => {
  const [status, setStatus] = useState<FetchStatus<T>>(
    pause ? { type: "pause" } : { type: "pending" }
  );
  const cancelTokenSourceRef = useRef<CancelTokenSource>();

  const buildError = (statusCode: number, error: string): FetchError => ({
    type: "error",
    statusCode,
    error,
  });

  const fetchCallback: FetchCallback<T> = useCallback(
    async (callbackRequestConfig) => {
      const source = axios.CancelToken.source();
      cancelTokenSourceRef.current = source;

      let newStatus: FetchStatus<T> = { type: "pending" };
      setStatus((current) => ({ ...current, ...newStatus }));

      try {
        const response: AxiosResponse<T> = await axios.request<T>({
          url,
          withCredentials: true,
          cancelToken: source?.token,
          ...{ ...requestConfig, ...callbackRequestConfig },
        });

        newStatus = { type: "success", data: response.data };
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axios.isCancel(error)) {
          // Request was canceled
          newStatus = buildError(0, "Request cancelled");
          return newStatus;
        }

        if (axiosError.response) {
          const { status, statusText } = axiosError.response;
          newStatus = buildError(status, statusText || "Unknown error");
        } else if (axiosError.request) {
          newStatus = buildError(0, "Request made but no response received");
        } else {
          newStatus = buildError(0, axiosError.message || "Unknown error");
        }
      }

      setStatus((current) => ({ ...current, ...newStatus }));

      return newStatus;
    },
    [url, requestConfig]
  );

  useEffect(() => {
    if (pause) return;

    const fetchData = async () => {
      await fetchCallback(requestConfig);
    };

    fetchData();

    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel("Request canceled by cleanup");
      }
    };
  }, [pause, url]);

  return [status, fetchCallback];
};
