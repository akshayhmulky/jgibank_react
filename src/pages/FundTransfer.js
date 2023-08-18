import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import { FUND_TRANSFER, GET_ACCOUNT_BY_USERNAME } from '../constants/API';

import './css/Beneficiary.css';
import './css/Account.css';

import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const FundTransfer = () => {
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('auth_token'));
  const [errorMessage, setErrorMessage] = useState('');

  //form states
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [amountToTransfer, setAmountToTransfer] = useState(0);
  const hiddenAccountId = useRef(null);

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
        FUND_TRANSFER,
        {
          beneficiaryId: Number(beneficiaryId),
          accountId: Number(hiddenAccountId.current.value),
          amountToTransfer: Number(amountToTransfer),
        },
        config
      );
      setErrorMessage('');
      navigate('/transaction');
    } catch (error) {
      if (error.response.request.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        console.log(error);
      }
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
          <h1>Fund Transfer</h1>
          <h3 style={{ color: 'red' }}>{errorMessage}</h3>
          {data &&
            data.map((account, index) => (
              <div key={index} style={{ maxWidth: '900px', margin: '0 auto' }}>
                <form onSubmit={onSubmit}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Transfer To Beneficiary:</td>
                        <td>
                          <select
                            value={beneficiaryId}
                            onChange={(e) => setBeneficiaryId(e.target.value)}
                          >
                            <option value="">Select Your Account</option>
                            {account.beneficiaries &&
                              account.beneficiaries.map(
                                (beneficiary, index) => (
                                  <option
                                    key={index}
                                    value={beneficiary.beneficiaryId}
                                  >
                                    {beneficiary.beneficiaryAccountNumber}
                                  </option>
                                )
                              )}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Transfer From </td>
                        <td>
                          {account.accountNumber}
                          <input
                            type="hidden"
                            name="accountId"
                            ref={hiddenAccountId}
                            value={account.accountId}
                            onChange={() => setAccountId(account.accountId)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Amount to Transfer</td>
                        <td>
                          <input
                            type="number"
                            name="amountToTransfer"
                            placeholder="Enter maximum transfer limit"
                            onChange={(e) =>
                              setAmountToTransfer(e.target.value)
                            }
                            value={amountToTransfer}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button>Transfer</button>
                </form>
              </div>
            ))}
        </>
      </div>
    </div>
  );
};

export default FundTransfer;
