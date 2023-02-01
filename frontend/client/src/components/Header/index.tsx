import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Drawer, FormControlLabel, IconButton, Menu, MenuItem, Stack, styled, Switch } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import Cookie from "universal-cookie";
import router from "next/router";
import { ColorModeContext } from '../../context/layout'
import { AuthContext } from '@/context/auth';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';

const cookie = new Cookie();

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Header() {
  const colorMode = useContext(ColorModeContext);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const label = { inputProps: { 'aria-label': 'Switch theme' } };
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    cookie.remove("access_token");
    setIsAuth(false)
    router.push("/home");
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!isAuth ?
      <List>
        <ListItem>
          <ListItemButton href='#'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton href='/auth'>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="LOGIN" />
          </ListItemButton>
        </ListItem>
      </List> :
      <List>
        <ListItem>
          <ListItemButton href='#'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="ACCOUNT" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="SETTING" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="LOGOUT" />
          </ListItemButton>
        </ListItem>
    </List>
    }
    </Box>
  );
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ mb: {xs: 8, sm: 10, md: 11, lg: 12 }, }}>
      <AppBar sx={{ backgroundColor: 'Black' }}>
        <Toolbar>
          {(['bottom'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)} sx={{ color: "white" }} ><MenuIcon /></Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
          <Typography variant="h6" component="div">
            Genius Chicken
          </Typography>
          <Switch {...label} onClick={colorMode.toggleColorMode} color="success" defaultChecked />
        </Toolbar>
      </AppBar>
      </Box>
    </React.Fragment>
  );
}