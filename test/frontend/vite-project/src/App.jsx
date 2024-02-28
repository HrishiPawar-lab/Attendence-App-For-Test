import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Attendence from './components/Attendence';
import Report from './components/Report';
import AdminReport from './components/AdminReport';
import Dashboard from './components/Dashboard';

const AuthContext = createContext();
const useAuthContext = () => {
  return useContext(AuthContext);
}
export { useAuthContext };



const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    console.log(loggedInUser)
  }, [loggedInUser])


  const handleLoggedInUser = (user) => {
    setLoggedInUser(user);
  };

  return (
    <div className='appWrapper'>
      <div className='card'>
        <AuthContext.Provider value={{
          loggedInUser, handleLoggedInUser,
        }}>
          <h2>Attendance App</h2>
          <Router>
            <Routes>
              <Route path='/' element={<Register />} />
              <Route path='/adminlogin' element={<AdminReport />} />
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/attendence' element={<Attendence />} />
              <Route path='/report' element={<Report />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
};
export default App;
