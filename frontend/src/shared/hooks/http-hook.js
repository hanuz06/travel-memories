import { useCallback, useRef, useState, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequestsRef = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: activeHttpRequestsRef?.current?.httpAbortCtrl?.signal,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    } finally {
      activeHttpRequestsRef.current = activeHttpRequestsRef.current.filter(
        (reqCtrl) => reqCtrl !== activeHttpRequestsRef.current.httpAbortCtrl,
      );
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const abortController = new AbortController();

    activeHttpRequestsRef.current.push(abortController);

    return () => {
      abortController.abort();
      const index = activeHttpRequestsRef.current.indexOf(abortController);
      if (index > -1) {
        activeHttpRequestsRef.current.splice(index, 1);
      }
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
