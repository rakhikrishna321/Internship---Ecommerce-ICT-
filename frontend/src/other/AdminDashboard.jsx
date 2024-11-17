import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // To store the list of users
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors while fetching users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/'); // Redirect if no token is found (user is not logged in)
          return; // Prevent further execution
        }

        const response = await axios.get('http://localhost:5001/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        setUsers(response.data); // Set the fetched user data
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false); // Stop the loading spinner once data is fetched or failed
      }
    };

    fetchUsers();
  }, [navigate]);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  }

  const handleShowProduct = () => {
    navigate('/admin/productlist');
  }

  return (
    <Container  style={{ padding: '24px', marginTop: '64px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell> {/* New column for actions */}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddProduct} 
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Product
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleShowProduct} 
            fullWidth
            sx={{ mt: 3 }}
          >
            Show Product
          </Button>
        </>
      )}

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout} 
        fullWidth
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default AdminDashboard;
