import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import {
    Box,
    List,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {
    ReorderRounded as ReorderRoundedIcon,
    LowPriorityRounded as LowPriorityRoundedIcon,
    BalanceRounded as BalanceRoundedIcon,
    UpdateRounded as UpdateRoundedIcon,
    TuneRounded as TuneRoundedIcon
} from '@mui/icons-material';
import Main from './main';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#161a1e',
    borderBottom: '1px solid #333333',
    width: '150px',
    height: `calc(100% - 76px)`,
    top: '50px',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#161a1e',
    width: `calc(${theme.spacing(7)} + 1px)`,
    borderBottom: '1px solid #333333',
    height: `calc(100% - 76px)`,
    top: '50px',
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(5)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MainContainer() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%', height: 'calc(100vh - 76px)' }}>
            <Drawer variant="permanent" open={open}>
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 1,
                                color: '#a0a0a0',
                                ...(open && { display: 'none' })
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    px: 0,
                                    justifyContent: 'center',
                                    color: '#a0a0a0'
                                }}
                                onClick={handleDrawerOpen}
                            >
                                <ReorderRoundedIcon sx={{ px: 0 }} />
                            </ListItemIcon>
                            <ListItemText primary='Inbox' sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 0,
                                py: 0,
                                color: '#a0a0a0',
                                ...(!open && { display: 'none' }),
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#a0a0a0'
                                }}
                                onClick={handleDrawerClose}
                            >
                                <IconButton>
                                    <LowPriorityRoundedIcon sx={{ color: '#a0a0a0' }} />
                                </IconButton>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    {['Equity', 'Futures', 'Options'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1,
                                    color: '#a0a0a0'
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: '#a0a0a0'
                                    }}
                                >
                                    {index === 0 ?
                                        <BalanceRoundedIcon />
                                        :
                                        index === 1 ?
                                            <UpdateRoundedIcon />
                                            :
                                            <TuneRoundedIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, overflow: 'hidden', backgroundColor: 'var(--light-dark)' }}>
                <Main />
            </Box>
        </Box>
    );
}