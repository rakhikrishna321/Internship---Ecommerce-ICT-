import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/log', {
        username,
        password,
      });

      // Store token in local storage
      localStorage.setItem('token', response.data.token); // Ensure your backend sends back a token

      // Handle different user roles
      if (response.data.role === 'admin') {
        setError(''); // Clear error if any
        navigate('/admin-dashboard'); // Navigate to admin dashboard
      } else if (response.data.role === 'user' && username === 'diya') {
        setError(''); // Clear error if any
        navigate('/userdashboard'); // Navigate to user dashboard
      } else {
        setError(''); // Clear error if any
        navigate('/userdash'); // Navigate to user dashboard
      }
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography variant="h5" align="center">Login</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', marginTop: 16 }}>
            <Typography variant="body2" align="center">
              Don't have an account? Register here
            </Typography>
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
