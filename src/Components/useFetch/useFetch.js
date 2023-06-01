import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

const useFetch = (url, credential) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
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
        setError(err);
      }
    };
    fetchData();
  }, []);

  const reFetch = async () => {
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
  };
  return { data, isLoading, error, reFetch };
};

export default useFetch;
