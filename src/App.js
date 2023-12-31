import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Account from './pages/Accounts';
import Transaction from './pages/Transaction';
import Beneficiary from './pages/Beneficiary';
import FundTransfer from './pages/FundTransfer';
import Register from './pages/Register';
import Login from './pages/Login';
import { AdminRoute } from './protectedRoute/AdminRoute';
import AdminDashboard from './pages/adminpage/AdminDashboard';
import UnAuthorized from './pages/UnAuthorized';
import AccountCreation from './pages/adminpage/AccountCreation';
import UserRoleChange from './pages/adminpage/UserRoleChange';
import ImpersonateCustomer from './pages/adminpage/ImpersonateCustomer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accounts" element={<Account />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/beneficiary" element={<Beneficiary />} />
          <Route path="/fund-transfer" element={<FundTransfer />} />

          <Route path="/unauthorized" element={<UnAuthorized />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute role={'ROLE_ADMIN'}>
                <AdminDashboard></AdminDashboard>
              </AdminRoute>
            }
          />
          <Route
            path="/create-account"
            element={
              <AdminRoute role={'ROLE_ADMIN'}>
                <AccountCreation></AccountCreation>
              </AdminRoute>
            }
          />

          <Route
            path="/change-role"
            element={
              <AdminRoute role={'ROLE_ADMIN'}>
                <UserRoleChange></UserRoleChange>
              </AdminRoute>
            }
          />

          <Route
            path="/impersonate-customer"
            element={
              <AdminRoute role={'ROLE_ADMIN'}>
                <ImpersonateCustomer></ImpersonateCustomer>
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
