import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import { useNavigate } from 'react-router-dom';
import '../styles/data.css';

export default function AllData() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    headers: [],
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-data/`);
        setValues((v) => ({
          ...v,
          headers: response.data.data.headers,
          data: response.data.data.data,
        }));
      } catch (e) {
        if (e.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <>
      {values.headers.length > 0 && values.data.length > 0 && (
        <>
          <Table products={values.data} headers={values.headers} />
        </>
      )}
    </>
  );
}
