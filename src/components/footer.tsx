import {
    Box,
    CssBaseline,
    BottomNavigation,
    Paper,
    Divider,
    Typography
} from '@mui/material';
import {
    SignalCellularAltRounded as SignalCellularAltRoundedIcon,
    NotificationImportantRounded as NotificationImportantRoundedIcon,
    CookieRounded as CookieRoundedIcon,
    CloudDownloadRounded as CloudDownloadRoundedIcon,
    ChatRounded as ChatRoundedIcon
} from '@mui/icons-material';

export default function Footer() {

    interface FooterMenuInterface {
        name: string;
        difference: string;
        price: string;
    }

    const footerMenu: FooterMenuInterface[] = [
        {
            name: 'BTCBUSD',
            difference: '-6.96',
            price: '19,965.75'
        },
        {
            name: 'ETHBUSD',
            difference: '-7.66',
            price: '1,409.85'
        },
        {
            name: 'MATICBUSD',
            difference: '-2.79',
            price: '1.0361'
        },
        {
            name: 'SOLBUSD',
            difference: '-2.15',
            price: '17.71'
        }
    ]

    const styles = {
        icons: {
            fontSize: '20px',
            color: 'var(--gray)',
            cursor: 'pointer'
        },
        divider: {
            borderColor: 'var(--gray)',
            marginInline: '10px',
            height: '18px'
        },
        paper: {
            position: 'fixed',
            height: '26px',
            bottom: 0,
            left: 0,
            right: 0
        },
        bottomNav: {
            bgcolor: '#161a1e',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '26px'
        },
        box: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px'
        }
    }

    return (
        <Box sx={{ height: '26px' }}>
            <CssBaseline />
            <Paper sx={{ ...styles.paper }} elevation={3}>
                <BottomNavigation showLabels sx={{ ...styles.bottomNav }}>
                    <Box sx={{ ...styles.box, paddingInline: '7px' }} >
                        <SignalCellularAltRoundedIcon sx={{ color: 'var(--dark-success)' }} />
                        <Box sx={{ color: 'var(--dark-success)' }}>
                            <Typography sx={{ fontSize: '12px', lineHeight: '12px', paddingTop: '3px' }}>Stable</Typography>
                            <Typography sx={{ fontSize: '10px' }}>connection</Typography>
                        </Box>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ ...styles.divider, marginLeft: '30px' }} />
                        {
                            footerMenu.map((ele, idx) => {
                                return (
                                    <Box sx={{ ...styles.box, gap: '8px' }} key={idx}>
                                        <Typography variant='h5' sx={{ color: 'var(--gray)' }}>{ele.name}</Typography>
                                        <Typography variant='h5' sx={{ color: 'var(--dark-danger)' }}>{ele.difference}</Typography>
                                        <Typography variant='h5' sx={{ color: 'var(--gray)' }}>{ele.price}</Typography>
                                        <Divider orientation="vertical" variant="middle" flexItem sx={{ ...styles.divider }} />
                                    </Box>
                                )
                            })
                        }
                        <Typography variant='h5' sx={{ color: 'var(--gray)' }}>SH</Typography>
                    </Box>
                    <Box sx={{ ...styles.box, paddingInline: '15px' }}>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ ...styles.divider }} />
                        <NotificationImportantRoundedIcon sx={{ ...styles.icons }} />
                        <Typography variant='h5' sx={{ color: 'var(--gray)', cursor: 'pointer' }} >Announcements</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ ...styles.divider }} />
                        <CookieRoundedIcon sx={{ ...styles.icons }} />
                        <Typography variant='h5' sx={{ color: 'var(--gray)', cursor: 'pointer' }} >Cookie</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ ...styles.divider }} />
                        <CloudDownloadRoundedIcon sx={{ ...styles.icons }} />
                        <Typography variant='h5' sx={{ color: 'var(--gray)', cursor: 'pointer' }} >Download</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ ...styles.divider }} />
                        <ChatRoundedIcon sx={{ ...styles.icons }} />
                        <Typography variant='h5' sx={{ color: 'var(--gray)', cursor: 'pointer' }} >Support</Typography>
                    </Box>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}