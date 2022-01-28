import axios from 'axios';
import { useEffect, useState } from 'react';

function useApiCall(url /*accessToken*/) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      const datas = await axios.get(url, {
        headers: { Authorization: `token ${accessToken}` },
      });
      setPayload(datas.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [payload, loading, error, fetchData];
}

export default useApiCall;
