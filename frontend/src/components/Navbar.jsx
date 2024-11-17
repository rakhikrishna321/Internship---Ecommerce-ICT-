import { AppBar, Button, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import cart_icon from '../assets/cart_icon.png'
import '../styles/Navbar.css'

const Navbar = () => {

    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here (e.g., API call or navigation)
    console.log('Searching for:', searchTerm);
  };

  return (
    <div>
        <AppBar style={{ backgroundColor: '#bdbdbd' }}>

            <Toolbar>
                {/* to add logo */}
                <Link to={'/'}>
                  <img src={logo} alt='Logo' className='logo' />
                </Link>
                <Typography variant='h6'>SRAKA</Typography>

                <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            {/* <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ marginRight: 2, width: '250px' }} // Adjust width as needed
            /> */}
            
          </form>


                <Link to={'/log'}>
                  <Button variant='text' color='error'>Login</Button>
                </Link>
                <Link to={'/register'}>
                  <Button variant='text' color='error'>Register</Button>
                </Link>
                <Link to={'/product'}>
                  <Button variant='text' color='error'>product</Button>
                </Link>
                

                {/* Cart Icon - Navigates to Cart Page */}
                <Link to={'/cart'}>
                        <img src={cart_icon} alt='Cart' style={{ width: '30px', height: 'auto', cursor: 'pointer', marginLeft: '20px' }} />
                    </Link>
                    
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar