import { React, useEffect, useState } from 'react';
import './EditProfile.css';
import axios from 'axios';
import { UPDATE_CUSOTOMER_PROFILE_BY_USERNAME_API } from '../constants/API';
import { jwtToken } from '../utils/GetUserDetails';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ data, setEdit }) => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  //Edit profile states
  const [fullName, setFullName] = useState(data.fullName && data.fullName);
  const [address, setAddress] = useState(data.address && data.address);
  const [phoneNumber, setPhoneNumber] = useState(
    data.phoneNumber && data.phoneNumber
  );
  const [gender, setGender] = useState(data.gender && data.gender);

  useEffect(() => {
    setToken(localStorage.getItem('auth_token'));
  }, []);

  //Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        UPDATE_CUSOTOMER_PROFILE_BY_USERNAME_API,
        {
          username: data.username,
          fullName: fullName,
          address: address,
          phoneNumber: phoneNumber,
          gender: gender,
        },
        config
      );
      setEdit(false);
    } catch (error) {
      console.error('Updation failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <table className="table_content">
          <tbody>
            <tr>
              <td className="label">FullName</td>
              <td>
                <input
                  type="text"
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">Address</td>
              <td>
                <input
                  type="text"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">Phone</td>
              <td>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">Gender</td>
              <td>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button>Save</button>{' '}
        <button onClick={() => setEdit(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfile;
