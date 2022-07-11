import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/data.css';

export default function Data() {
  const navigate = useNavigate();
  const params = useParams();
  const [values, setValues] = useState({
    headers: [],
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-data/${params.pageId}`);
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
  }, [navigate, params.pageId]);

  return (
    <>
      <div className="backBtn">
        <button style={{ fontSize: '24px' }} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      {values.headers.length > 0 && values.data.length > 0 && (
        <Table products={values.data} headers={values.headers} />
      )}
    </>
  );
}
