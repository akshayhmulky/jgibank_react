import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import { CHANGE_USER_ROLE, GET_ALL_CUSTOMERS } from '../../constants/API';

import '../css/Beneficiary.css';
import '../css/Account.css';

import axios from 'axios';

const UserRoleChange = () => {
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

  const onChangeRole = async (e, username, role) => {
    e.preventDefault();
    console.log(username, role);
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      setErrorMessage('');
      const response = await axios.put(
        CHANGE_USER_ROLE,
        {
          username,
          role,
        },
        config
      );
      setErrorMessage('Role has been updated');
      console.log('GOT', response);
    } catch (error) {
      console.log(error);
      setErrorMessage('Unable to change the role');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="account_detail">
        <>
          <h1>Change User Role</h1>
          <h3 style={{ color: 'red' }}>{errorMessage}</h3>

          <div>
            <div className="table_container">
              <table className="table_content">
                <tbody>
                  <tr>
                    <th>Customer Id</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Change Role</th>
                  </tr>
                  {data &&
                    data.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.customerId && customer.customerId}</td>
                        <td>{customer.username && customer.username}</td>
                        <td>{customer.role && customer.role}</td>
                        <td>
                          {customer.role === 'ROLE_ADMIN' ? (
                            <button
                              style={{ cursor: 'pointer' }}
                              onClick={(e) =>
                                onChangeRole(e, customer.username, 'ROLE_USER')
                              }
                            >
                              Make User
                            </button>
                          ) : (
                            <button
                              style={{ cursor: 'pointer' }}
                              onClick={(e) =>
                                onChangeRole(e, customer.username, 'ROLE_ADMIN')
                              }
                            >
                              Make Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default UserRoleChange;
