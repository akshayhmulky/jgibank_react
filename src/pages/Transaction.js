import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { GET_ACCOUNT_BY_USERNAME } from '../constants/API';
import './css/Account.css';
import axios from 'axios';
import { extractDateFromGivenFormat } from '../utils/GetNiceDateFormat';
import { Navigate } from 'react-router-dom';

const Transaction = () => {
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
          Transaction Details
        </div>
        <>
          {data &&
            data.map((account, index) => (
              <div key={index}>
                <div className="table_container">
                  <div className="account_of_beneficiary">
                    <div style={{ marginBottom: '10px' }}>
                      Account:
                      <span style={{ fontWeight: '600', marginLeft: '4px' }}>
                        {account.accountNumber}
                      </span>
                    </div>

                    <table className="table_content">
                      <tbody>
                        <tr>
                          <th>transactionId</th>
                          <th>transactionDate</th>
                          <th>transferFrom</th>
                          <th>transferTo</th>
                          <th>withdraw</th>
                          <th>deposit</th>
                          <th>balance</th>
                        </tr>
                        {account.transactions &&
                          account.transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>{transaction.transactionId}</td>
                              <td>
                                {extractDateFromGivenFormat(
                                  transaction.transactionDate
                                )}
                              </td>
                              <td>{transaction.transferFrom}</td>
                              <td>{transaction.transferTo}</td>
                              <td>Rs {transaction.withdraw}</td>
                              <td>Rs {transaction.deposit}</td>
                              <td>Rs {transaction.balance}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
        </>
      </div>
    </div>
  );
};

export default Transaction;
