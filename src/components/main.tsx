import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import WatchListTabC from './watchlistTabC';

const Main: React.FC = () => {

    const [moveWatchlistItemPosX, setMoveWatchlistItemPosX] = useState(0)
    const [moveWatchlistItemPosY, setMoveWatchlistItemPosY] = useState(0)
    const [watchlistItems, setWatchlistItems] = useState([[['']], [['']]])
    const [moveWatchlistItem, setMoveWatchlistItem] = useState('')
    const [watchlistTimer, setWatchlistTimer] = useState<NodeJS.Timeout | null>(null)
    const [left, setLeft] = useState('0px')
    const [top, setTop] = useState('0px')
    const [width, setWidth] = useState('0px')
    const [height, setHeight] = useState('0px')
    const [dropPos, setDropPos] = useState([0, 0, false, false])

    useEffect(() => {
        const test: any = [
            [
                ['watchlist(61)', 'watchlist(14)'],
                ['watchlist(42)', 'watchlist(63)'],
                ['watchlist(123)', 'watchlist(32)']
            ],
            [
                ['watchlist(12)', 'watchlist(68)'],
                ['watchlist(34)', 'watchlist(53)']
            ]
        ]
        setWatchlistItems(test)
    }, [])

    useEffect(() => {
        document.onmousemove = handleMoveWatchlist
        document.onmouseup = handleDropWatchlist
    })

    const handleMoveWatchlist = (event: any) => {
        if (moveWatchlistItem !== '') {
            setMoveWatchlistItemPosX(event.clientX - 40)
            setMoveWatchlistItemPosY(event.clientY - 50)
            const windowsWidth = window.innerWidth;
            const windowsHeight = window.innerHeight;
            if (watchlistItems[0].length === 0 || watchlistItems[1].length === 0) {
                if (moveWatchlistItemPosX < (windowsWidth - 40) / 3) {
                    setWidth('50%')
                    setHeight('100%')
                    setLeft('0px')
                    setTop('0px')
                    setDropPos([0, 0, false, false])
                } else if (moveWatchlistItemPosX > (windowsWidth - 40) * 2 / 3) {
                    setWidth('50%')
                    setHeight('100%')
                    setLeft('50%')
                    setTop('0px')
                    setDropPos([0, 1, false, false])
                } else {
                    setWidth('100%')
                    setHeight('50%')
                    setLeft('0px')
                    if (moveWatchlistItemPosY < (windowsHeight - 76) / 2) {
                        setTop('0px')
                        setDropPos([0, 0, true, false])
                    } else {
                        setTop('50%')
                        setDropPos([1, 0, false, false])
                    }
                }
            } else {
                if (moveWatchlistItemPosY < 30 && moveWatchlistItemPosY > 0) {
                    setHeight('30px')
                    setTop('0px')
                    const width = (windowsWidth - 40) / watchlistItems[0].length
                    setWidth((100 / watchlistItems[0].length) + '%')
                    const left = Math.floor(moveWatchlistItemPosX / width) * 100 / watchlistItems[0].length
                    setLeft(left + '%')
                    setDropPos([0, Math.floor(moveWatchlistItemPosX / width), false, true])
                } else if (
                    moveWatchlistItemPosY < (windowsHeight / 2 - 8) &&
                    moveWatchlistItemPosY > (windowsHeight / 2 - 38)) {
                    setHeight('30px')
                    setTop(windowsHeight / 2 - 38 + 'px')
                    const width = (windowsWidth - 40) / watchlistItems[1].length
                    setWidth((100 / watchlistItems[1].length) + '%')
                    const left = Math.floor(moveWatchlistItemPosX / width) * 100 / watchlistItems[1].length
                    setLeft(left + '%')
                    setDropPos([1, Math.floor(moveWatchlistItemPosX / width), false, true])
                } else {
                    setWidth('50%')
                    setHeight('50%')
                    if (
                        (moveWatchlistItemPosX < (windowsWidth - 40) / 2) &&
                        (moveWatchlistItemPosY < (windowsHeight - 76) / 2)
                    ) {
                        setLeft('0px')
                        setTop('0px')
                        setDropPos([0, 0, false, false])
                    } else if (
                        (moveWatchlistItemPosX > (windowsWidth - 40) / 2) &&
                        (moveWatchlistItemPosY < (windowsHeight - 76) / 2)
                    ) {
                        setLeft('50%')
                        setTop('0px')
                        setDropPos([0, 1, false, false])
                    } else if (
                        (moveWatchlistItemPosX < (windowsWidth - 40) / 2) &&
                        (moveWatchlistItemPosY > (windowsHeight - 76) / 2)
                    ) {
                        setLeft('0px')
                        setTop('50%')
                        setDropPos([1, 0, false, false])
                    } else {
                        setLeft('50%')
                        setTop('50%')
                        setDropPos([1, 1, false, false])
                    }

                    if (moveWatchlistItemPosY < (windowsHeight - 76) / 2) {
                    } else {
                        setTop('50%')
                    }
                }
            }
        } else {
            clearTimeout(watchlistTimer!)
            setMoveWatchlistItem('')
        }
    }

    const handleDropWatchlist = () => {
        if (moveWatchlistItem !== '') {
            if (dropPos[3]) {
                watchlistItems[Number(dropPos[0])][Number(dropPos[1])].push(moveWatchlistItem)
            } else {
                if (dropPos[1] === 0) {
                    if (dropPos[2]) {
                        watchlistItems[1] = watchlistItems[0]
                        watchlistItems[0] = []
                        watchlistItems[0].push([moveWatchlistItem])
                    } else {
                        watchlistItems[Number(dropPos[0])].unshift([moveWatchlistItem])
                    }
                } else {
                    watchlistItems[Number(dropPos[0])].push([moveWatchlistItem])
                }
            }
            setWatchlistItems([...watchlistItems])
            setMoveWatchlistItem('')
            clearTimeout(watchlistTimer!)
            setWatchlistTimer(null)
        }
    }

    const watchlistTabDrag = (event: any, x: number, y: number, i: number) => {
        const timer = setTimeout(() => {
            setMoveWatchlistItem(watchlistItems[x][y][i])
            setMoveWatchlistItemPosX(event.clientX - 40)
            setMoveWatchlistItemPosY(event.clientY - 50)
            if (watchlistItems[x][y].length === 1) {
                watchlistItems[x].splice(y, 1)
            } else {
                watchlistItems[x][y].splice(i, 1)
            }
            setWatchlistItems([...watchlistItems])
            setWatchlistTimer(null)
        }, 500);

        setWatchlistTimer(timer)
    }

    const styles = {
        container: {
            width: '100%',
            position: 'relative'
        },
        moveWatchlist: {
            box: {
                position: 'fixed',
                left: moveWatchlistItemPosX,
                top: moveWatchlistItemPosY + 35,
                width: '300px',
                border: '1px solid var(--light-dark)',
                zIndex: 2000
            },
            tab: {
                backgroundColor: '#161a1e',
                color: 'white',
                paddingInline: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
            },
            tabPanel: {
                backgroundColor: 'var(--dark)',
                height: '200px',
                padding: 3
            }
        },
        dropBoxContainer: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
        },
        dropBoxWatchlistBox: {
            border: '1px solid #fff',
            borderStyle: 'dotted',
            backgroundColor: 'var(--black)',
            opacity: 0.5,
            position: 'absolute',
            width: width,
            height: height,
            left: left,
            top: top
        },
    }

    return (
        <Box sx={{ ...styles.container }}>
            {
                moveWatchlistItem !== '' ?
                    <Box sx={{ ...styles.moveWatchlist.box }}>
                        <Box sx={{ ...styles.moveWatchlist.tab }}>{moveWatchlistItem}</Box>
                        <Box sx={{ ...styles.moveWatchlist.tabPanel }}>{moveWatchlistItem}</Box>
                    </Box>
                    :
                    null
            }
            {
                moveWatchlistItem !== '' ?
                    <Box sx={{ ...styles.dropBoxContainer }}>
                        <Box sx={{ ...styles.dropBoxWatchlistBox }}></Box>
                    </Box>
                    :
                    null
            }
            {
                watchlistItems.map((watchListItemsForHorizontal, idx) => {
                    return (
                        <Box sx={{ display: 'flex' }} key={idx}>
                            {
                                watchListItemsForHorizontal.length != 0 ?
                                    watchListItemsForHorizontal.map((watchListItem, jdx) => {
                                        return (
                                            <WatchListTabC
                                                posHorizon={idx}
                                                posVetical={jdx}
                                                watchlistItems={watchlistItems}
                                                setWatchlistItems={setWatchlistItems}
                                                setMoveWatchlistItem={setMoveWatchlistItem}
                                                watchlistTabDrag={watchlistTabDrag}
                                                key={jdx}
                                            />
                                        )
                                    })
                                    :
                                    null
                            }
                        </Box>
                    )
                })
            }
        </Box>
    );
};

export default Main;