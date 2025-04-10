import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import '../assets/styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                username,
                password,
            });
            console.log(response.data);
            const { accessToken, role } = response.data;
            login({ role }, accessToken);
                if (role === 'Admin') {
                    navigate('/admin');
                } else if (role === 'PM') {
                    navigate('/pm');
                } else if (role === 'Staff') {
                    navigate('/staff');
                } else {
                    navigate('/login');
                }
        } catch (error) {
            alert('Wrong account or password');
        }
    };
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-login">LOGIN</div>
                    <div className="col-12 form-group login-input">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-login" onClick={handleLogin}>
                            LOGIN
                        </button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password?</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;
