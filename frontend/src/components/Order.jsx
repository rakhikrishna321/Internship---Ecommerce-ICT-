import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Adjust the path if needed
import axios from 'axios';

const Order = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate(); // For navigation
    const { cartItems, addToCart } = useCart(); // Get cart items from context and addToCart function
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const cartProduct = cartItems.find(item => item._id === id); // Find the product in the cart by ID
            if (cartProduct) {
                setProduct(cartProduct);
            } else {
                try {
                    const response = await axios.get(`http://localhost:5001/api/products/${id}`);
                    setProduct(response.data);
                    addToCart(response.data); // Add product to cart if not already there
                } catch (error) {
                    console.error('Product not found:', error);
                }
            }
        };

        fetchProduct();
    }, [id, cartItems, addToCart]);

    if (!product) {
        return <h2>Product not found!</h2>; // Handle case where product is not found
    }

    const totalPrice = product.price * quantity; // Calculate total price

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
    };

    const handleOrderConfirmation = () => {
        // Here you can add any order confirmation logic, e.g. API call
        
        navigate('/transaction'); // Navigate to the transaction page
    };

    return (
        <div style={{ padding: '24px', marginTop: '64px' }} >
            <h2>Order Summary</h2>
            <div>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                <p>Category: {product.category}</p>
                <p>Price per item: ${product.price.toFixed(2)}</p>
                <div>
                    <button onClick={handleDecrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease}>+</button>
                </div>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button onClick={handleOrderConfirmation}>Make transaction</button>
            </div>
        </div>
    );
};

export default Order;
