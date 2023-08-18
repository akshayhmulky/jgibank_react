import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { GET_ACCOUNT_BY_USERNAME } from '../constants/API';

import './css/Account.css';

import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const [data, setData] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('auth_token'));
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .get(`${GET_ACCOUNT_BY_USERNAME}${username}`, config)
      .then((response) => {
        setData(response.data);
        console.log('RESPONE DATE', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (localStorage.getItem('auth_token') === null) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <div className="account_detail">
        <div
          style={{
            fontSize: '2.1rem',
            margin: '10px',
            fontWeight: '600',
            color: '#e66f1e',
          }}
        >
          Account Details
        </div>
        <>
          {data &&
            data.map((account, index) => (
              <div key={index}>
                <div className="table_container">
                  <table className="table_content">
                    <tbody>
                      <tr>
                        <td className="label">AccountId</td>
                        <td>{account.accountId && account.accountId}</td>
                      </tr>
                      <tr>
                        <td className="label">Account Number</td>
                        <td>
                          {account.accountNumber && account.accountNumber}
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Bank Branch</td>
                        <td>{account.bankBranch && account.bankBranch}</td>
                      </tr>
                      <tr>
                        <td className="label">IFSC Code</td>
                        <td>{account.ifscCode && account.ifscCode}</td>
                      </tr>
                      <tr>
                        <td className="label">Minimum Balance</td>
                        <td>
                          {account.minimumBalance && account.minimumBalance}
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Total Balance</td>
                        <td>{account.totalBalance && account.totalBalance}</td>
                      </tr>
                      <tr>
                        <td className="label">Account Type</td>
                        <td>{account.accountType && account.accountType}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </>
      </div>
    </div>
  );
};

export default Account;
