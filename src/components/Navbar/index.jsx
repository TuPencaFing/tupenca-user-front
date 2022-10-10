import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../assets/logo.png';
import './styles.scss';

const pages = [{
    name: 'Pencas',
    route: '/',
    auth: false,
}, {
    name: 'Mis pencas',
    route: '/',
    auth: true,
}, {
    name: 'Próximos eventos',
    route: '/',
    auth: true,
}];
const settings = ['Mi perfil', 'Cerrar sesión'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user = null;
    // const user = {
    //     name: "Remy Sharp",
    // };

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
                            {pages.filter(page => page.auth === false).map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Menu>
                    </Box>

                    <Box className="navbar-icon" sx={{ flexGrow: { xs: 1, md: 0 } }}>
                        <img
                            src={logo}
                            alt="Tu Penca"
                            width="64px"
                            height="59px"
                        />
                    </Box>
                    <Box className="navbar-options" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.filter(page => page.auth === false).map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
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
                                    <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <Button className="login-button" variant="contained">
                            Iniciar sesión
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
