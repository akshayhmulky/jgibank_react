import React, { useEffect, useState } from 'react';
import './css/Home.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { NavLink, Navigate } from 'react-router-dom';
import { FETCH_CUSTOMER_BY_USERNAME_API } from '../constants/API';
import EditProfile from '../components/EditProfile';

const Home = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('auth_token'));

  useEffect(() => {
    fetchData();
  }, [edit]);

  const fetchData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .get(`${FETCH_CUSTOMER_BY_USERNAME_API}${username}`, config)
      .then((response) => {
        setData(response.data);
        console.log('RESPONE DATE', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  if (localStorage.getItem('username') === 'admin') {
    return <Navigate replace to="/admin" />;
  }

  if (localStorage.getItem('auth_token') === null) {
    return <Navigate replace to="/login" />;
  }

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="container">
          <div className="inner_container">
            <div className="upper_section">
              <div
                style={{
                  fontSize: '2.1rem',
                  margin: '4px',
                  fontWeight: '600',
                  color: '#e66f1e',
                }}
              >
                Profile
              </div>
              <div style={{ fontSize: '1.3rem', margin: '6px' }}>
                Welcome to JGI Bank{' '}
                <span className="welcome_tile">{username}</span>
              </div>
              {edit && edit ? (
                <EditProfile data={data && data} setEdit={setEdit} />
              ) : (
                <table className="table_content">
                  <tbody>
                    <tr>
                      <td className="label">Customer Id</td>
                      <td>{data.customerId && data.customerId} </td>
                      <td>🔒</td>
                    </tr>
                    <tr>
                      <td className="label">FullName</td>
                      <td>{data.fullName && data.fullName}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleEdit()}
                      >
                        📝
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Email</td>
                      <td>{data.email && data.email} </td>
                      <td>🔒</td>
                    </tr>
                    <tr>
                      <td className="label">Username</td>
                      <td>{username && username} </td>
                      <td>🔒</td>
                    </tr>
                    <tr>
                      <td className="label">Address</td>
                      <td>{data.address && data.address}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleEdit()}
                      >
                        📝
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Phone</td>
                      <td>{data.phoneNumber && data.phoneNumber}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleEdit()}
                      >
                        📝
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Gender</td>
                      <td>{data.gender && data.gender}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleEdit()}
                      >
                        📝
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            <div className="lower_section" style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '2.1rem',
                  margin: '26px 0 4px 0',
                  fontWeight: '600',
                  color: '#e66f1e',
                }}
              >
                Accounts
              </div>
              {data.account && data.account.length === 0 ? (
                <div style={{ color: 'red', fontSize: '1.8rem' }}>
                  Sorry you dont have any account, please contact JGIBank admin{' '}
                </div>
              ) : (
                <>
                  {data.account &&
                    data.account.map((account, index) => (
                      <div key={index} className="navlink_cover">
                        <NavLink
                          // to={`/accounts/${account.accountNumber}`}
                          to={`/accounts`}
                          key={index}
                          className="nav_link_bankaccount"
                        >
                          <p className="bank_account_tag">
                            Account Number: {account.accountNumber}
                          </p>
                        </NavLink>
                        {/* <p>Balance: {account.balance}</p> */}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
