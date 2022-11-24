import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/logo.png';
import './styles.scss';

const Navbar = ({ pages, routes }) => {
    let location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.session);
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClickPage = (route) => {
        handleCloseNavMenu();
        navigate(route);
    };

    const classNamePage = (route) => {
        if (location.pathname === route) {
            return 'current-page-path';
        } else {
            return 'page-path';
        }
    }

    return (
        <AppBar className="navbar" position="sticky" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                         <IconButton
                            size="large"
                            aria-label="Cuenta de usuario actual"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon cursor="pointer" />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handleClickPage(page.route)}
                                    sx={{ display: 'block', color: '#E76F51' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Menu>
                    </Box>

                    <Box className="navbar-icon" sx={{ flexGrow: { xs: 1, md: 0 } }}>
                        <Link to="/" className="no-style">
                            <img
                                src={logo}
                                alt="Tu Penca"
                                width="64px"
                                height="59px"
                            />
                        </Link>
                    </Box>
                    <Box className="navbar-options" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleClickPage(page.route)}
                                sx={{ display: 'block' }}
                                className={classNamePage(page.route)}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {user ? (
                        <Box className="user-logged">
                            <Button
                                className="logout-button"
                                variant="contained"
                                onClick={() => navigate(routes.logoutUrl)}
                            >
                                Cerrar sesión
                            </Button>
                            <Tooltip title={user.name}>
                                <AccountCircleIcon fontSize="large" />
                            </Tooltip>
                        </Box>
                    ) : (
                        <Button className="login-button" variant="contained" onClick={() => navigate(routes.loginUrl)}>
                            Iniciar sesión
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
