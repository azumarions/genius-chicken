import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Drawer, Snackbar, Switch } from '@mui/material'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Cookie from 'universal-cookie'
import router from 'next/router'
import { ColorModeContext } from '../../context/layout'
import { AuthContext } from '@/context/auth'
import HomeIcon from '@mui/icons-material/Home'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LogoutIcon from '@mui/icons-material/Logout'
import { SnackbarMessage } from '@/types'
import DialpadIcon from '@mui/icons-material/Dialpad'
import PersonIcon from '@mui/icons-material/Person'
import Groups3Icon from '@mui/icons-material/Groups3'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const cookie = new Cookie()

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function Header() {
  const colorMode = useContext(ColorModeContext)
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([])
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )
  const label = { inputProps: { 'aria-label': 'Switch theme' } }
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ ...state, [anchor]: open })
    }

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const handleBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const account = () => {
    router.push('/account')
  }

  const task = () => {
    router.push('/task')
  }

  const users = () => {
    router.push('/users')
  }

  const login = () => {
    router.push('/auth')
  }

  const home = () => {
    router.push('/')
  }

  const about = () => {
    router.push('/about')
  }

  const profile = () => {
    router.push('/profile')
  }

  const logout = () => {
    cookie.remove('access_token')
    setIsAuth(false)
    setSnackPack((prev) => [
      ...prev,
      { message: 'ログアウトしました！', key: new Date().getTime() },
    ])
    router.push('/')
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!isAuth ? (
        <List>
          <ListItem>
            <ListItemButton onClick={home}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="HOME" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={about}>
              <ListItemIcon>
                <DialpadIcon />
              </ListItemIcon>
              <ListItemText primary="ABOUT" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={profile}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="PROFILE" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={login}>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="LOGIN" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemButton onClick={account}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="ACCOUNT" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={task}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="TASKS" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={users}>
              <ListItemIcon>
                <Groups3Icon />
              </ListItemIcon>
              <ListItemText primary="USERS" />
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
      )}
    </Box>
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <AppBar color="inherit">
          <Toolbar>
            {(['bottom'] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)} color="inherit">
                  <MenuIcon />
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <Box sx={{ fontFamily: 'serif' }}>Genius Chicken</Box>
            <Switch
              {...label}
              onClick={colorMode.toggleColorMode}
              color="success"
              defaultChecked
            />
          </Toolbar>
        </AppBar>
      </Box>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleBarClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleBarClose}
        >
          {messageInfo?.message}
        </Button>
      </Snackbar>
    </React.Fragment>
  )
}
