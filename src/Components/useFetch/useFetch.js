import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

const useFetch = (url, credential) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = Cookies.get("userToken");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}${url}/${credential}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || err.message);
      setError(err);
      setIsLoading(false);
    }
  }, [url, credential, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}${url}/${credential}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [url, credential, token]);

  return { data, isLoading, error, reFetch };
};

export default useFetch;
