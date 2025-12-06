import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useLocation} from 'react-router';
import SidebarContext from '../../context/SidebarContext.ts';
import {DRAWER_WIDTH, MINI_DRAWER_WIDTH} from '../../constants.ts';
import SidebarPageItem from './SidebarPageItem.tsx';
import SidebarHeaderItem from './SidebarHeaderItem.tsx';
import {getDrawerSxTransitionMixin, getDrawerWidthTransitionMixin,} from '../../mixins.ts';
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppContext} from "../../context/AppContext.tsx";

export interface DashboardSidebarProps {
    expanded?: boolean;
    setExpanded: (expanded: boolean) => void;
    disableCollapsibleSidebar?: boolean;
    container?: Element;
}

/**
 * Dashboard sidebar component compose
 * @param expanded
 * @param setExpanded
 * @param disableCollapsibleSidebar
 * @param container
 * @constructor
 */
export default function Sidebar({
                                    expanded = true,
                                    setExpanded,
                                    disableCollapsibleSidebar = false,
                                    container,
                                }: DashboardSidebarProps) {
    const theme = useTheme();
    const {pathname} = useLocation();
    const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>([]);
    const {
        conversations, clearAllConversations,
        activeConversationId, setIsNewConversationModalOpen
    } = useAppContext();

    const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
    const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

    const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
    const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);


    React.useEffect(() => {
        if (expanded) {
            const drawerWidthTransitionTimeout = setTimeout(() => {
                setIsFullyExpanded(true);
            }, theme.transitions.duration.enteringScreen);

            return () => clearTimeout(drawerWidthTransitionTimeout);
        }

        setIsFullyExpanded(false);

        return () => {
        };
    }, [expanded, theme.transitions.duration.enteringScreen]);

    React.useEffect(() => {
        if (!expanded) {
            const drawerWidthTransitionTimeout = setTimeout(() => {
                setIsFullyCollapsed(true);
            }, theme.transitions.duration.leavingScreen);

            return () => clearTimeout(drawerWidthTransitionTimeout);
        }

        setIsFullyCollapsed(false);

        return () => {
        };
    }, [expanded, theme.transitions.duration.leavingScreen]);

    const mini = !disableCollapsibleSidebar && !expanded;

    const handleSetSidebarExpanded = React.useCallback(
        (newExpanded: boolean) => () => {
            setExpanded(newExpanded);
        },
        [setExpanded],
    );

    const handlePageItemClick = React.useCallback(
        (itemId: string, hasNestedNavigation: boolean) => {
            if (hasNestedNavigation && !mini) {
                setExpandedItemIds((previousValue) =>
                    previousValue.includes(itemId)
                        ? previousValue.filter(
                            (previousValueItemId) => previousValueItemId !== itemId,
                        )
                        : [...previousValue, itemId],
                );
            } else if (!isOverSmViewport && !hasNestedNavigation) {
                setExpanded(false);
            }
        },
        [mini, setExpanded, isOverSmViewport],
    );

    const hasDrawerTransitions =
        isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

    // @ts-ignore
    // @ts-ignore
    const getDrawerContent = React.useCallback(
        (viewport: 'phone' | 'tablet' | 'desktop') => (
            <React.Fragment>
                <Toolbar/>
                <Box
                    component="nav"
                    aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
                    sx={{
                        height: '50vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'auto',
                        scrollbarGutter: mini ? 'stable' : 'auto',
                        overflowX: 'hidden',
                        pt: !mini ? 0 : 2,
                        ...(hasDrawerTransitions
                            ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
                            : {}),
                    }}
                >

                    <List
                        dense
                        sx={{
                            padding: mini ? 0 : 0.5,
                            mb: 4,
                            mt: 1,
                            width: mini ? MINI_DRAWER_WIDTH : 'auto',
                            alignItems: 'center',
                        }}
                    >

                        {mini ? (
                            <IconButton onClick={() => setIsNewConversationModalOpen(true)}
                                        sx={{width: "80%"}}>
                                <AddIcon/>
                            </IconButton>
                        ) : (
                            <Button variant="outlined"
                                    startIcon={<AddIcon/>}
                                    onClick={() => setIsNewConversationModalOpen(true)}

                                    sx={{width: "80%"}}>
                                New Chat
                            </Button>
                        )}

                        <Divider sx={{width: mini ? MINI_DRAWER_WIDTH : "90%", my: 2}}/>

                        {conversations.length == 0 ? (
                            <SidebarHeaderItem>No conversation yet</SidebarHeaderItem>
                        ) : (
                            <>
                                {conversations.map(conv => (
                                    <SidebarPageItem
                                        key={conv.id}
                                        id={conv.id.toString()}
                                        title={conv.title}
                                        icon={<ChatBubbleIcon/>}
                                        selected={conv.id === activeConversationId}
                                    />
                                ))}
                            </>
                        )}
                    </List>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    bottom: 30,
                    width: '100%',
                    px: 2,
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Divider sx={{width: mini ? MINI_DRAWER_WIDTH : "90%", my: 2}}/>
                    {mini ? (
                        <IconButton onClick={clearAllConversations}
                                    sx={{width: "80%"}}>
                            <DeleteIcon sx={{color: 'red'}}/>
                        </IconButton>
                    ) : (

                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon sx={{color: 'red'}}/>}
                            onClick={clearAllConversations}
                            sx={{
                                width: "80%",
                                borderColor: "red",
                                color: "red",
                                '&:hover': {
                                    borderColor: "darkred",
                                    color: "darkred"
                                }
                            }}
                        >
                            <span style={{color: 'red'}}>Clear all chats</span>
                        </Button>
                    )}
                </Box>
            </React.Fragment>
        ),
        [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds, pathname, conversations, activeConversationId],
    );

    const getDrawerSharedSx = React.useCallback(
        (isTemporary: boolean) => {
            const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

            return {
                displayPrint: 'none',
                width: drawerWidth,
                flexShrink: 0,
                ...getDrawerWidthTransitionMixin(expanded),
                ...(isTemporary ? {position: 'absolute'} : {}),
                [`& .MuiDrawer-paper`]: {
                    position: 'absolute',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundImage: 'none',
                    ...getDrawerWidthTransitionMixin(expanded),
                },
            };
        },
        [expanded, mini],
    );

    const sidebarContextValue = React.useMemo(() => {
        return {
            onPageItemClick: handlePageItemClick,
            mini,
            fullyExpanded: isFullyExpanded,
            fullyCollapsed: isFullyCollapsed,
            hasDrawerTransitions,
        };
    }, [
        handlePageItemClick,
        mini,
        isFullyExpanded,
        isFullyCollapsed,
        hasDrawerTransitions,
    ]);

    return (
        <SidebarContext.Provider value={sidebarContextValue}>
            <Drawer
                container={container}
                variant="temporary"
                open={expanded}
                onClose={handleSetSidebarExpanded(false)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {
                        xs: 'block',
                        sm: disableCollapsibleSidebar ? 'block' : 'none',
                        md: 'none',
                    },
                    ...getDrawerSharedSx(true),
                }}
            >
                {getDrawerContent('phone')}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {
                        xs: 'none',
                        sm: disableCollapsibleSidebar ? 'none' : 'block',
                        md: 'none',
                    },
                    ...getDrawerSharedSx(false),
                }}
            >
                {getDrawerContent('tablet')}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', md: 'block'},
                    ...getDrawerSharedSx(false),
                }}
            >
                {getDrawerContent('desktop')}
            </Drawer>
        </SidebarContext.Provider>
    );
}
