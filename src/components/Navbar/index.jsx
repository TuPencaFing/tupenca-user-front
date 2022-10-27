import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/logo.png';
import './styles.scss';

const pages = [{
    name: 'Pencas',
    route: '/',
    auth: false,
}, {
    name: 'Mis pencas',
    route: '/mis-pencas',
    auth: true,
}, {
    name: 'Próximos eventos',
    route: '/proximos-eventos',
    auth: true,
}];
const settings = [{
    id: 1,
    name: 'Mi perfil',
    route: '/profile',
}, {
    id: 2,
    name: 'Cerrar sesión',
    route: '/logout',
}];

const Navbar = () => {
    const navigate = useNavigate();
    const {isLogged, user} = useSelector((state) => state.session);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickPage = (route) => {
        handleCloseNavMenu();
        navigate(route);
    };

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
                            {pages.filter(page => page.auth === isLogged).map((page) => (
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
                        {pages.filter(page => page.auth === isLogged).map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleClickPage(page.route)}
                                sx={{ display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {user ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={user.name}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.name.toUpperCase()} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <Button className="login-button" variant="contained" onClick={() => navigate('/login')}>
                            Iniciar sesión
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
