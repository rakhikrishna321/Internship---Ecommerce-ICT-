import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Adjust the path if needed

const Transaction = () => {
    const navigate = useNavigate(); // For navigation
    const { cartItems } = useCart(); // Get cart items from context

    const handleConfirmOrder = () => {
        alert('Order placed!');
        navigate('/product'); // Change to your actual product page route
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px',marginTop: '8' }}>
            <h2>Transaction Summary</h2>
            {cartItems.map(item => (
                <div key={item.id} style={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '5px', 
                    padding: '20px', 
                    margin: '10px', 
                    width: '300px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                    textAlign: 'center' 
                }}>
                    <h3>{item.title}</h3>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button onClick={handleConfirmOrder} style={{ 
                        padding: '10px 20px', 
                        fontSize: '16px', 
                        color: '#fff', 
                        backgroundColor: '#007bff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                    }}>
                        Confirm Order
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Transaction;
