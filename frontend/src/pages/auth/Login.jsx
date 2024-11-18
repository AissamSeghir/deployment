import React, { useState } from 'react';
import Logo from '/logo.svg';
import './auth.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link , useNavigate} from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading, isError, error } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className='formAuth'>
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          placeholder='You@example.com'
          name='email'
          onChange={handleChange}
          required
          value={formData.email}
        />
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          name='password'
          onChange={handleChange}
          placeholder='password'
          value={formData.password}
        />
        <button disabled={isLoading}>Sign in</button>
        {isError && <p className="error">{error.message}</p>}
        <p>Don't have an account? <span><Link to='/signup'>Sign up</Link></span></p>
      </form>
    </div>
  );
}

export default Login;
