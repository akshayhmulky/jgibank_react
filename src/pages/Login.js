import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import jwt_decode from 'jwt-decode';

import './css/RegisterLogin.css';
import { LOGIN_API } from '../constants/API';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_API,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response?.data?.token);
      localStorage.setItem(
        'role',
        jwt_decode(response?.data?.token).role[0].authority
      );

      localStorage.setItem('auth_token', response?.data?.token);
      localStorage.setItem('username', jwt_decode(response?.data?.token).sub);
      setUsername('');
      setPassword('');
      if (
        jwt_decode(response?.data?.token).role[0].authority === 'ROLE_ADMIN'
      ) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.response.request.status);
      if (error.response.request.status === 400) {
        setErrorMessage('Invalid username or Password');
      } else {
        setErrorMessage(error.response.data?.messages[0]);
      }
    }
  };

  if (localStorage.getItem('auth_token') !== null) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="main_container" id="main_container_id">
      <div className="title_bank" id="title_login">
        Welcome to JGIBank
      </div>
      <div className="title_description">
        Your secured banking is just one step away
      </div>
      <div style={{ fontSize: '1.4rem' }}>
        <br />
        <div>Admin Credential for account creation process</div>
        <span>
          username: <strong>admin</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>
          password: <strong>admin</strong>
        </span>
      </div>
      <div className="myform">
        <form onSubmit={onSubmit}>
          <span className="error_message">{errorMessage}</span>
          <input
            type="text"
            name="username"
            placeholder="Enter your username (e.g., 'rocky123' if your email address is rocky123@gmail.com)."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>Login</button>
          <span className="goto-link">
            Don't have an account?<Link to="/register"> Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
