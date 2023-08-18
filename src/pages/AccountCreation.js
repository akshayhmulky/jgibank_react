import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { ACCOUNT_OPENING } from '../constants/API';

import './css/Beneficiary.css';
import './css/Account.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountCreation = () => {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('auth_token'));
  const [errorMessage, setErrorMessage] = useState('');

  //form states

  const [bankBranch, setBankBranch] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [minimumBalance, setMinimumBalance] = useState('');
  const [accountType, setAccountType] = useState('');
  const [customerId, setCustomerId] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await axios.post(
        ACCOUNT_OPENING,
        {
          bankBranch,
          ifscCode,
          minimumBalance,
          accountType,
          customerId,
        },
        config
      );
      setErrorMessage('Account opening succcessful');
    } catch (error) {
      console.log(error);
      setErrorMessage('Unable to open an account');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="account_detail">
        <>
          <h1>Account Opening for Customer</h1>
          <h3 style={{ color: 'red' }}>{errorMessage}</h3>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <form onSubmit={onSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>BankBranch</td>
                    <td>
                      <select
                        value={bankBranch}
                        onChange={(e) => setBankBranch(e.target.value)}
                      >
                        <option value="">Select Bank Branch</option>
                        <option value="CHEMBUR">CHEMBUR</option>
                        <option value="MALAD">MALAD</option>
                        <option value="DAHISAR">DAHISAR</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>IFSC CODE</td>
                    <td>
                      <select
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                      >
                        <option value="">Select IFSC Code</option>
                        <option value="JGIBANK001">JGIBANK001</option>
                        <option value="JGIBANK002">JGIBANK002</option>
                        <option value="JGIBANK003">JGIBANK003</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Account Minimum Balance to Maintain</td>
                    <td>
                      <input
                        type="text"
                        name="minimumBalance"
                        placeholder="Enter maximum balance to maintain"
                        onChange={(e) => setMinimumBalance(e.target.value)}
                        value={minimumBalance}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Account Type</td>
                    <td>
                      <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                      >
                        <option value="">Select IFSC Code</option>
                        <option value="SAVINGS">SAVINGS</option>
                        <option value="CURRENT">CURRENT</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Id</td>
                    <td>
                      <input
                        type="text"
                        name="customerId"
                        placeholder="Enter Customer Id"
                        onChange={(e) => setCustomerId(e.target.value)}
                        value={customerId}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button>Open an Account</button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default AccountCreation;
