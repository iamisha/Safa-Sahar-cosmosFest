"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    alert(`Submitted Data:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
  };

  const handleReset = () => {
    // Reset the form fields
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="button-row">
            <Button type="button" onClick={handleSubmit}>
              Sign Up
            </Button>

            <Button type="button" onClick={handleReset}>
              Log In
            </Button>

            <Button type="button" onClick={handleReset}>
              Forget Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
