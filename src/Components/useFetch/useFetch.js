import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authProvider";

const useFetch = (url, credential) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, userInfo, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        token && setIsLoading(true);
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
  }, [loading, token, url, credential]);

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
