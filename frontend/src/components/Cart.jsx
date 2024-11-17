import React from 'react';
import { useCart } from '../context/CartContext'; // Ensure the path to the context file is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Paper, Button, Grid } from '@mui/material';
import './Cart.css'; // Make sure to create this CSS file for styling

const Cart = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const handlePurchase = (item) => {
        // Navigate to the order page, passing the item ID
        navigate(`/order/${item._id}`); // Make sure to use _id
    };

    return (
        <div  style={{ padding: '24px', marginTop: '64px' }}>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is currently empty.</p>
            ) : (
                <Grid container spacing={3}>
                    {cartItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Paper className="card">
                                <img src={item.image} alt={item.name} className="card-image" />
                                <div className="card-details">
                                    <h3>{item.name}</h3>
                                    <p>Category: {item.category}</p>
                                    <p>Price: ${item.price}</p>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handlePurchase(item)} // Updated to use navigate
                                    >
                                        Purchase
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default Cart;
