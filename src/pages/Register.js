import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import './css/RegisterLogin.css';
import { REGISTER_API } from '../constants/API';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_API,
        {
          email: email,
          fullName: fullName,
          address: address,
          phoneNumber: phoneNumber,
          gender: gender,
          password: password,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Registration successful:', response.data);
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error?.response?.data?.messages[0]);
      setErrorMessage(error.response.data.messages[0]);
    }
  };

  if (localStorage.getItem('auth_token') !== null) {
    return <Navigate replace to="/" />;
  }

  return (
    <div id="main_container_id">
      <div className="title_bank">Welcome to JGIBank</div>
      <div className="title_description">
        Your secured banking is just one step away
      </div>
      <div className="myform">
        <form onSubmit={onSubmit}>
          <span className="error_message">{errorMessage}</span>
          <div className="first_block">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Enter your residential address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="OTHER">OTHER</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button>Register</button>
          <span className="goto-link">
            Already have an account?<Link to="/login"> Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
