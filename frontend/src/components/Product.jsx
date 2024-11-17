import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Ensure the path is correct

const Product = () => {
  const [products, setProducts] = useState([]); // To store the list of products
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors while fetching products
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Function to add items to cart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data); // Set the fetched product data
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false); // Stop the loading spinner once data is fetched or failed
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    navigate(`/order/${product._id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <Container sx={{ padding: 3, marginTop: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
      Quality, variety, and value – explore our carefully selected range of products designed to suit every need and taste.
      </Typography>
      
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.image || 'https://via.placeholder.com/140'}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleBuyNow(product)}
                    style={{ margin: '10px 0' }}
                  >
                    Buy Now
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleAddToCart(product)}
                    style={{ margin: '10px 0' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Product;
