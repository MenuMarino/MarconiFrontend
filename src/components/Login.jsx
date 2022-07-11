import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/signin', {
        ...values,
      });
      if (data.status === 'success') {
        navigate('/data');
      }
    } catch (ex) {
      alert('Username y/o contraseña incorrectos.');
    }
  };

  return (
    <div className="Box">
      <div className="Form">
        <h2 className="Title">Login Account</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className="Btn btn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
