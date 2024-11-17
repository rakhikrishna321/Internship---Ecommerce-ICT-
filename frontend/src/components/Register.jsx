import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Link as MuiLink, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:5001/register', {
        username,
        email,
        password,
      });

      setSuccess(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/log'); // Redirect to login after 2 seconds
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : 'Registration failed');
      setSuccess('');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Register
        </Typography>
        {success && <Typography color="success.main" align="center">{success}</Typography>}
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
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            sx={{ marginTop: 2 }} 
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} /> : 'Register'} {/* Show loader if loading */}
          </Button>
          <MuiLink 
            href="/log" 
            sx={{ textDecoration: 'none', color: '#1976d2', display: 'block', marginTop: 2, textAlign: 'center' }}
          >
            <Typography variant="body2">
              Already have an account? Login here
            </Typography>
          </MuiLink>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
