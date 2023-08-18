import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { ADD_BENEFICIARY, GET_ACCOUNT_BY_USERNAME } from '../constants/API';

import './css/Beneficiary.css';
import './css/Account.css';

import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Beneficiary = () => {
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('auth_token'));

  //form states
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState('');
  const [maximumTransferLimit, setMaximumTransferLimit] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await axios.post(
        ADD_BENEFICIARY,
        {
          beneficiaryName,
          beneficiaryAccountNumber,
          maximumTransferLimit,
          accountNumber,
        },
        config
      );
      navigate('/beneficiary');
    } catch (error) {
      console.error('Updation failed:', error);
    }
  };

  if (localStorage.getItem('auth_token') === null) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <div className="account_detail">
        <>
          <div className="add_beneficiary">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="beneficiaryName"
                placeholder="Enter Beneficiary Name"
                onChange={(e) => setBeneficiaryName(e.target.value)}
                value={beneficiaryName}
              />
              <input
                type="text"
                name="beneficiaryAccountNumber"
                placeholder="Enter Beneficiary AccountNumber"
                onChange={(e) => setBeneficiaryAccountNumber(e.target.value)}
                value={beneficiaryAccountNumber}
              />

              <input
                type="number"
                name="maximumTransferLimit"
                placeholder="Enter maximum transfer limit"
                onChange={(e) => setMaximumTransferLimit(e.target.value)}
                value={maximumTransferLimit}
              />

              <select
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              >
                <option value="">Select Your Account</option>
                {data &&
                  data.map((account, index) => (
                    <option key={index} value={account.accountNumber}>
                      {account.accountNumber}
                    </option>
                  ))}
              </select>
              <button>Add Beneficiary</button>
            </form>
          </div>
          <div
            style={{
              fontSize: '2.1rem',
              margin: '10px',
              fontWeight: '600',
              color: '#e66f1e',
            }}
          >
            Beneficiaries
          </div>
          {data &&
            data.map((account, index) => (
              <div key={index}>
                <div className="table_container">
                  <div className="account_of_beneficiary">
                    <div>Account: {account.accountNumber}</div>

                    <table className="table_content">
                      <tbody>
                        <tr>
                          <th>beneficiaryId</th>
                          <th>beneficiaryName</th>
                          <th>beneficiaryBankName</th>
                          <th>beneficiaryAccountNumber</th>
                          <th>maximumTransferLimit</th>
                        </tr>
                        {account.beneficiaries &&
                          account.beneficiaries.map((beneficiary, index) => (
                            <tr key={index}>
                              <td>{beneficiary.beneficiaryId}</td>
                              <td>{beneficiary.beneficiaryName}</td>
                              <td>{beneficiary.beneficiaryBankName}</td>
                              <td>{beneficiary.beneficiaryAccountNumber}</td>
                              <td>{beneficiary.maximumTransferLimit}</td>
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

export default Beneficiary;
