import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication data here if needed
    localStorage.removeItem('token'); // Assuming you're using local storage to manage tokens
    navigate('/'); // Redirect to home page
  };

  return (
    <Container sx={{ padding: 3, marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Information</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>diya</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>diya@gmail.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout} 
        style={{ marginTop: '20px' }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default User;
