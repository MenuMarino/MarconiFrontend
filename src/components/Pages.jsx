import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import '../styles/data.css';

export default function Pages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/pages');
        setPages(response.data.data.pages);
      } catch (e) {
        if (e.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.get('/logout');
      navigate('/');
    } catch (e) {
      if (e.response.status === 401) {
        navigate('/');
      }
    }
  };

  return (
    <>
      <div className="backBtn">
        <button style={{ fontSize: '24px' }} onClick={() => logout()}>
          Log out
        </button>
      </div>
      <div className="pages">
        {pages.length ? (
          pages.map((pageId) => (
            <>
              <div className="page">
                <Link to={'/data/' + pageId}>{pageId}</Link>
              </div>
            </>
          ))
        ) : (
          <h2>No data available</h2>
        )}
      </div>
    </>
  );
}
