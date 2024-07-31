import React, { useState } from 'react';
import PolygonImg from '../assets/Group 2.png';
import EllipseImg1 from '../assets/Ellipse 1.png';
import EllipseImg2 from '../assets/Ellipse 2.png';
import './BackgroundPage.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import showToasts from './Toast';

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/login', {
        email: loginData.email,
        password: loginData.password
      });
      if (response.data.status === 'Success') {
        console.log(response.data);
        showToasts(response.data.message, 'success');
        localStorage.setItem('formBotEmail', loginData.email);
        localStorage.setItem('formBotToken', response.data.token);
        navigate('/workspace');
      } else {
        showToasts(response.data.message, 'error');
      }
    } catch (error) {
      showToasts('Email or password is incorrect', 'error');
      console.log('Error during login:', error);
    }
  };

  return (
    <>
      <div className="background-container">
        <img src={PolygonImg} alt="Polygon" className="polygon-image" />
        <img src={EllipseImg2} alt="Ellipse 2" className="ellipse-image-2" />

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <p>Email</p>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Password</p>
              <input
                type="password"
                placeholder="*******"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            <button className="submit-btn" type="submit">Login</button>
            <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
          </form>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img src={EllipseImg1} alt="Ellipse 1" className="ellipse-image-1" />
      </div>
    </>
  );
}

export default Login;
