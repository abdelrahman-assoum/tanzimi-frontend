import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext, TokenState } from "../../context/authProvider";

const useFetch = (url, credential) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const firstLoading = useRef(false)
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
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
    }
  }, [token, url, credential]);

  const reFetch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_URL}${url}/${credential}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, reFetch };
};

export default useFetch;
