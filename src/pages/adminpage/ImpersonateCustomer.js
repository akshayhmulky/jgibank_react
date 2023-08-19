import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { CHANGE_USER_ROLE, GET_ALL_CUSTOMERS } from '../../constants/API';

import '../css/Beneficiary.css';
import '../css/Account.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImpersonateCustomer = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('auth_token'));

  const [errorMessage, setErrorMessage] = useState('');

  //form states
  const [data, setData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .get(`${GET_ALL_CUSTOMERS}`, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [errorMessage]);

  const impersonateCustomer = async (e, username) => {
    e.preventDefault();
    // console.log(username);
    localStorage.setItem('username', username);
    navigate('/');
  };

  const stopImpersonating = () => {
    localStorage.setItem('username', 'admin');
    navigate('/admin');
  };

  return (
    <div>
      <NavBar />
      <div className="account_detail">
        <>
          <h1>Impersonate Customer to perform task on their behalf</h1>
          <h3 style={{ color: 'red' }}>{errorMessage}</h3>

          <div>
            <div className="table_container">
              <table className="table_content">
                <tbody>
                  <tr>
                    <th>Customer Id</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Login as</th>
                  </tr>
                  {data &&
                    data.map(
                      (customer, index) =>
                        customer.role !== 'ROLE_ADMIN' && (
                          <tr key={index}>
                            <td>{customer.customerId}</td>
                            <td>{customer.username}</td>
                            <td>{customer.role}</td>
                            <td>
                              {localStorage.getItem('username') !== 'admin' ? (
                                <button
                                  style={{ cursor: 'pointer' }}
                                  onClick={(e) => stopImpersonating()}
                                >
                                  Stop Impersonating
                                </button>
                              ) : (
                                <button
                                  style={{ cursor: 'pointer' }}
                                  onClick={(e) =>
                                    impersonateCustomer(e, customer.username)
                                  }
                                >
                                  Impersonate
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ImpersonateCustomer;
