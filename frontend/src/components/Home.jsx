import React from 'react';

import heroImage from '../assets/hero_image.png'; // Import the image
import '../styles/Home.css'; // Import the CSS file
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <div className="home-container">
            <div className="text-section">
                <Typography variant="h2" component="h1" gutterBottom>
                    Discover Your Style with Sraka: Trendy Clothing for Every Occasion!
                </Typography>
                <Typography variant="body1" paragraph>
                    Explore our exclusive collection of clothing designed to inspire confidence and elegance.
                </Typography>
            </div>
            <div 
                className="image-section" 
                style={{ backgroundImage: `url(${heroImage})` }} // Use inline style for background image
            ></div>
            
        </div>
    );
};

export default Home;
