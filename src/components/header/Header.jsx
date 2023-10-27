import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  IoMenuSharp, IoHomeSharp, IoLogoJavascript, IoLogoReact, IoNewspaperSharp, IoLogOutOutline,
} from 'react-icons/io5';
import AccordionHeader from './AccordionHeader';
import { useGetUserQuery } from '../../store/api';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
function User(props) {
  const { userId } = props;
  const { data, isLoading } = useGetUserQuery(userId);
  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Stack sx={{
      flexDirection: 'row',
      gap: '30px',
    }}
    >
      <Typography variant="h6" noWrap component="div" sx={{ color: 'black' }}>
        {data.name}
      </Typography>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <IoLogOutOutline fontSize={25} style={{ color: 'black' }} />
      </Link>
    </Stack>
  );
}

function Header(props) {
  const { children } = props;
  const [open, setOpen] = React.useState(true);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];

  const handleDrawerOpen = () => {
    setOpen(!open);
    setOpenMobile(!openMobile);
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={screenWidth < 1024 ? openMobile : open} sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open),
            }}
          >
            <IoMenuSharp fontSize={25} />
          </IconButton>
          <User userId={userId} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={screenWidth < 1024 ? openMobile : open}>
        <DrawerHeader />
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open || openMobile ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open || openMobile ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <IoHomeSharp fontSize={20} />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open || openMobile ? 1 : 0 }}>
                <Link
                  to={`/users/${userId}/dashboard`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                  }}
                >
                  Dashboard
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open || openMobile ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <AccordionHeader name="JS Course" icon={<IoLogoJavascript fontSize={20} />} lessonPath={`/users/${userId}/courses/java-script/lessons`} homeworkPath={`/users/${userId}/courses/java-script/homeworks`} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open || openMobile ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <AccordionHeader name="React Course" icon={<IoLogoReact fontSize={20} />} lessonPath={`/users/${userId}/courses/react/lessons`} homeworkPath={`/users/${userId}/courses/react/homeworks`} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Technical articles'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open || openMobile ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open || openMobile ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <IoNewspaperSharp fontSize={20} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open || openMobile ? 1 : 0 }}>
                  <Link
                    to={`/users/${userId}/technical-articles`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                    }}
                  >
                    {text}
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Header;
