import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Typography, Modal, Button, Grid } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';

const WatchListTabC = ({ posHorizon, posVetical, setWatchlistItems, watchlistItems, setMoveWatchlistItem, watchlistTabDrag }: { posHorizon: number, posVetical: number, setWatchlistItems: any, watchlistItems: any, setMoveWatchlistItem: any, watchlistTabDrag: any }) => {

    const styles = {
        watchBox: {
            width: posHorizon === 0 ?
                100 / watchlistItems[0].length + '%' : 100 / watchlistItems[1].length + '%',
            height: watchlistItems[0].length === 0 || watchlistItems[1].length === 0 ?
                'calc(100vh - 76px)' : 'calc(50vh - 38px)',
            border: '1px solid var(--light-dark)',
            color: 'white'
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'var(--black)',
            height: '30px'
        },
        tabs: {
            minHeight: '30px'
        },
        tab: {
            color: 'white !important',
            minHeight: '30px',
            minWidth: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
            paddingLeft: '8px',
            paddingRight: '8px'
        },
        closeBtn: {
            color: 'white',
            width: '15px',
        },
        customTabPanel: {
            backgroundColor: 'var(--dark)',
            height: watchlistItems[0].length === 0 || watchlistItems[1].length === 0 ?
                'calc(100vh - 108px)' : 'calc(50vh - 70px)'
        },
        icons: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
        },
        modal: {
            backgroundColor: 'var(--dark)',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            boxShadow: 24,
            paddingInline: 4,
            pt: 6,
            pb: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
        }
    }

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                style={{ ...styles.customTabPanel }}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    useEffect(() => {
        if(value >= watchlistItems[posHorizon][posVetical].length) {
            setValue(watchlistItems[posHorizon][posVetical].length - 1);
        }
    })

    function tabProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);
    const [watchlistTimer, setWatchlistTimer] = useState<NodeJS.Timeout | null>(null)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const closeWatchList = () => {
        watchlistItems[posHorizon].splice(posVetical, 1)
        setWatchlistItems([...watchlistItems])
    }

    const closeWatchListTab = (idx: number) => {
        if (watchlistItems[posHorizon][posVetical].length == 1) {
            if (watchlistItems[0].length + watchlistItems[1].length == 1) {
                setWatchlistItems([[['watchlist(1)']], []])
            } else {
                closeWatchList()
            }
        } else {
            watchlistItems[posHorizon][posVetical].splice(idx, 1)
            setWatchlistItems([...watchlistItems])
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setValue(0)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const selAddWatchlist = (event: any) => {
        watchlistItems[posHorizon][posVetical].push(event.target.value);
        setWatchlistItems([...watchlistItems])
        setOpen(false)
    }

    return (
        <Box sx={{ ...styles.watchBox }}>
            <Box sx={{ ...styles.nav }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ ...styles.tabs }}>
                        {
                            watchlistItems[posHorizon][posVetical].map((watchlist: any, idx: number) => {
                                return (
                                    <Tab
                                        label={
                                            <Box display='flex' justifyContent='center' alignItems='center' gap='6px'>
                                                {watchlist}
                                                <DragIndicatorRoundedIcon
                                                    onMouseDown={(event) => watchlistTabDrag(event, posHorizon, posVetical, idx)}
                                                    sx={{ ...styles.closeBtn }}
                                                />
                                                <CloseRoundedIcon onClick={() => closeWatchListTab(idx)} sx={{ ...styles.closeBtn }} />
                                            </Box>
                                        }
                                        {...tabProps(idx)}
                                        sx={{ ...styles.tab }}
                                        key={idx}
                                    />
                                )
                            })
                        }
                        <Box sx={{ ...styles.icons }}>
                            <AddRoundedIcon onClick={() => handleOpen()} sx={{ ...styles.closeBtn }} />
                        </Box>
                    </Tabs>
                </Box>
                {
                    watchlistItems[0].length + watchlistItems[1].length === 1 ?
                        null
                        :
                        <Box sx={{ ...styles.icons }}>
                            <CloseRoundedIcon onClick={() => closeWatchList()} sx={{ ...styles.closeBtn, marginInline: '8px' }} />
                        </Box>
                }
            </Box>
            {
                watchlistItems[posHorizon][posVetical].map((watchlist: any, idx: number) => {
                    return (
                        <CustomTabPanel value={value} index={idx} key={idx}>
                            {watchlist}
                        </CustomTabPanel>
                    )
                })
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...styles.modal }}>
                    {
                        [['watchlist(12)', 'watchlist(12)', 'watchlist(12)'],
                        ['watchlist(12)', 'watchlist(12)', 'watchlist(12)'],
                        ['watchlist(12)', 'watchlist(12)', 'watchlist(12)']].map((addEle, idx) => {
                            return (
                                <Grid container spacing={0} key={idx}>
                                    {
                                        addEle.map((ele, jdx) => {
                                            return (
                                                <Grid item xs={4} sx={{ textAlign: 'center' }} key={jdx}>
                                                    <Button variant="contained" onClick={(event) => selAddWatchlist(event)} value={ele}>{ele}</Button>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            )
                        })
                    }
                </Box>
            </Modal>
        </Box>
    );
};

export default WatchListTabC;