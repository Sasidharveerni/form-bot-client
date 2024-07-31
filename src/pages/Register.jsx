import React, { useState } from 'react';
import PolygonImg from '../assets/Group 2.png';
import EllipseImg1 from '../assets/Ellipse 1.png';
import EllipseImg2 from '../assets/Ellipse 2.png';
import './BackgroundPage.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import showToasts from './Toast';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
            
                const response = await axios.post('http://localhost:5000/register', {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password
                })
                console.log(response.data)
                if(response.data.status === 'Success') {
                    showToasts(response.data.message, 'success')
                    localStorage.setItem('formBotEmail', formData.name);
                    localStorage.setItem('formBotToken', response.data.token);
                    navigate('/workspace')
                }
            } catch (error) {
                console.log('There is an error posting the data: ', error)
            }
           
            setErrors({});
            // Proceed with form submission
            console.log('Form data:', formData);
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
                            <p className={errors.name ? 'error-text' : ''}>Username</p>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your username"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'error-border' : ''}
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                        <div>
                            <p className={errors.email ? 'error-text' : ''}>Email</p>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error-border' : ''}
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                        <div>
                            <p className={errors.password ? 'error-text' : ''}>Password</p>
                            <input
                                type="password"
                                name="password"
                                placeholder="*******"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error-border' : ''}
                            />
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
                        <div>
                            <p className={errors.confirmPassword ? 'error-text' : ''}>Confirm Password</p>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="*******"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'error-border' : ''}
                            />
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
                        <button className='submit-btn' type="submit">Sign Up</button>
                        <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
                    </form>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <img src={EllipseImg1} alt="Ellipse 1" className="ellipse-image-1" />
            </div>
        </>
    );
}

export default Register;
