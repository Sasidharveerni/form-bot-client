/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkSpace from './components/workspace/WorkSpace';
import Flow from './components/flow/Flow';
import FormBot from './pages/FormBot';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Settings from './pages/Settings';

function App() {

  const email = localStorage.getItem('formBotEmail') || '';
  const token = localStorage.getItem('formBotToken') || '';

  console.log(email, token)

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkUserLoginStatus = async () => {
    try {
      console.log(email)
      if (email !== '' && token !== '') {
        const response = await axios.post('http://localhost:5000/login/status', {email} , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.status === 'Success') {
          console.log(response.data.user);
          localStorage.setItem('formBotCreatorId', response.data.user._id)
          setUserData(response.data.user);
          setIsLogin(true);
        }
      } else {
        setIsLogin(false);
        setUserData(null);
      }
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage isLogin={isLogin}/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/workspace' element={<WorkSpace userData={userData}/>} />
          <Route path='/start-flow' element={<Flow userData={userData}/>} />
          <Route path='/form-bot' element={<FormBot />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
