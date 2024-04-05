import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(url);

      if (!res.ok) {
        setError("Failed to fetch");
      }
      const result = await res.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData(); // Function to refetch data
  };

  return {
    data,
    error,
    loading,
    refetch,
  };
};

export default useFetch;
