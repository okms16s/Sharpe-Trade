import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
    ImageList,
    ImageListItem,
    Divider
} from '@mui/material';
import {
    AccountCircle as AccountCircle,
    Mail as MailIcon,
    SettingsRounded as SettingsRoundedIcon,
    HelpRounded as HelpRoundedIcon,
    MoreVert as MoreIcon,
    FiberManualRecordRounded as FiberManualRecordRoundedIcon
} from '@mui/icons-material';
import CircularProgress from '@mui/joy/CircularProgress';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                top: '40px',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} sx={{}}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <HelpRoundedIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    interface SymbolDisplay {
        name: string;
        value: string;
    }

    const symbolDisplayTopList: SymbolDisplay[] = [
        {
            name: 'NIFTY50 87.70',
            value: '19,965.74'
        },
        {
            name: 'NIFTY BANK 222.60',
            value: '46,965.74'
        },
        {
            name: 'NIFTY FIN SERVICE 123.95',
            value: '24,459.50'
        },
        {
            name: 'INDIA VIX 0.31.95',
            value: '19.74'
        }
    ]

    interface SymbolAnalInterface {
        name: string,
        value: string,
        percent: number,
        percentVal: string
    }

    const symbolAnalList: SymbolAnalInterface[] = [
        {
            name: 'Pull to call',
            value: '0.745',
            percent: 46,
            percentVal: '0.7'
        },
        {
            name: 'Call flow',
            value: '132,678',
            percent: 61,
            percentVal: '61%'
        },
        {
            name: 'Pull flow',
            value: '98,876',
            percent: 39,
            percentVal: '39%'
        }
    ]

    return (
        <Box sx={{ flexGrow: 1, height: '50px' }}>
            <AppBar position="static" sx={{ backgroundColor: 'var(--dark)', height: '50px' }}>
                <Toolbar sx={{ height: '50px', minHeight: '50px !important' }}>
                    <ImageList cols={2}>
                        <ImageListItem>
                            <img src="/assets/img/logo.png" alt='logo' loading="lazy" style={{ width: '30px' }} />
                        </ImageListItem>
                    </ImageList>
                    <Box display='flex' gap='10px'>
                        {
                            symbolDisplayTopList.map((ele, idx) => {
                                return (
                                    <Box key={idx}>
                                        <Typography variant='h6'>{ele.name}</Typography>
                                        <Typography variant='h5' style={{ color: 'var(--dark-success)', letterSpacing: '1.5px' }}>{ele.value}</Typography>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Divider orientation="vertical" variant="middle" flexItem sx={{
                        width: '2px',
                        height: '50px',
                        backgroundColor: 'var(--black)',
                        marginInline: '10px',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }} />

                    <Box display='flex' gap='20px'>
                        <Box>
                            <Typography variant='h6'>Expected</Typography>
                            <Box display='flex' gap='4px'>
                                <Typography variant='h5' style={{ fontSize: '12px' }}>Bullish</Typography>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    <Box
                                        sx={{
                                            backgroundColor: '#4c5055',
                                            width: '70px',
                                            height: '10px',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            gap: '5px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: 'var(--success)',
                                                width: '45px',
                                                height: '10px',
                                                borderRadius: '10px'
                                            }}
                                        ></Box>
                                        <Typography
                                            sx={{
                                                fontSize: '8px'
                                            }}
                                        >723</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {
                            symbolAnalList.map((ele, idx) => {
                                return (
                                    <Box display='flex' gap='10px' key={idx}>
                                        <Box>
                                            <Typography variant='h6'>{ele.name}</Typography>
                                            <Typography variant='h5'>{ele.value}</Typography>
                                        </Box>
                                        <Box>
                                            <CircularProgress
                                                variant="soft"
                                                value={ele.percent}
                                                color={
                                                    ele.percent < 40 ?
                                                        'danger'
                                                        :
                                                        ele.percent > 60 ?
                                                            'success'
                                                            :
                                                            'primary'
                                                }
                                                determinate
                                                sx={{ color: 'white' }}
                                            >
                                                {ele.percentVal}
                                            </CircularProgress>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>


                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, height: '50px' }}>
                        <Box
                            sx={{ textAlign: 'center', backgroundColor: 'var(--black)' }}
                            paddingInline={'10px'}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            marginRight='10px'
                        >
                            <Box>
                                <Typography variant='h5' style={{ color: 'var(--primary)' }}>
                                    <IconButton
                                        aria-label="mails"
                                        color="inherit"
                                        style={{
                                            padding: '4px',
                                            paddingTop: '0px'
                                        }}
                                    >
                                        <FiberManualRecordRoundedIcon
                                            style={{
                                                fontSize: '10px',
                                                color: 'var(--success)'
                                            }}
                                        />
                                    </IconButton>
                                    True Data+
                                </Typography>
                                <Typography variant='h5' style={{ color: 'var(--light)' }}>Connected</Typography>
                            </Box>
                        </Box>
                        <IconButton size="small" aria-label="mails" color="inherit" sx={{ paddingInline: '8px' }}>
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="small"
                            aria-label="settings"
                            color="inherit"
                            sx={{
                                paddingInline: '8px'
                            }}
                        >
                            <SettingsRoundedIcon />
                        </IconButton>
                        <Box
                            sx={{ textAlign: 'center' }}
                            paddingInline={'10px'}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Box>
                                <Typography variant='h5' style={{ color: 'var(--light)' }}>07:57:02 PM</Typography>
                                <Typography variant='h5' style={{ color: 'var(--light)' }}>Local</Typography>
                            </Box>
                        </Box>
                        <IconButton
                            size="small"
                            aria-label="help"
                            color="inherit"
                            sx={{
                                paddingInline: '8px'
                            }}
                        >
                            <HelpRoundedIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ paddingInline: '8px' }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}