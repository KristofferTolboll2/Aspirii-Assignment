import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export const useAxios = <T>(url: string, options: AxiosRequestConfig = {}) => {
  const [data, setData] = useState<T>([] as T);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchRef = useRef(0);

  useEffect(() => {
    if (isLoading) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const request = await axios.get(url, options);
        if (request.status === 200) {
          setData(request.data);
        } else {
          setErrorMessage("Something went wrong");
        }
      } catch (error) {
        const parsedError = error as AxiosError;
        setErrorMessage(parsedError.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const refetch = useCallback(() => {
    fetchRef.current = fetchRef.current + 1;
  }, []);

  return { data, isLoading, errorMessage, refetch };
};
