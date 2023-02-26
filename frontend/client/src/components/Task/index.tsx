import Cookie from 'universal-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../context/task'
import { GROUP, SnackbarMessage, TASK, USER } from '@/types'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from '@mui/material'
import BlurOnIcon from '@mui/icons-material/BlurOn'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import TaskDetail from '../TaskDetail'
import useSWR from 'swr'
import { GroupContext } from '@/context/group'
import { UserContext } from '@/context/user'
import Group from '../Group'

const cookie = new Cookie()

type Type = {
  task: TASK
  staticGroups: GROUP[]
  staticUsers: USER[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/group-list/`

const Task: React.FC<Type> = ({ task, staticGroups, staticUsers }) => {
  const { setSelectedTask } = useContext(TaskContext)
  const { setSelectedUsers } = useContext(UserContext)
  const { setSelectedGroups } = useContext(GroupContext)
  const [open, setOpen] = useState(false)
  const [inGroup, setInGroup] = useState(false)
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpenDialog(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([])
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )

  const {
    data: groups,
    error,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: staticGroups,
    revalidateOnMount: true,
  })

  const group: GROUP = groups.find(
    (group: GROUP) =>
      group.taskGroup === task.id &&
      staticUsers.map((user) => user.id === group.userGroup)
  )

  const GroupIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/group/`, {
      method: 'POST',
      body: JSON.stringify({ taskGroup: task.id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      } else {
        setSnackPack((prev) => [
          ...prev,
          { message: 'グループに入りました！', key: new Date().getTime() },
        ])
      }
    })
    mutate()
  }

  const GroupOut = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/group/${group.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      } else {
        setSnackPack((prev) => [
          ...prev,
          { message: 'グループを退出しました。', key: new Date().getTime() },
        ])
      }
    })
    mutate()
  }

  const renderSwitch = (statusName: string) => {
    switch (statusName) {
      case 'Not started':
        return <Badge variant="dot" color="error"></Badge>
      case 'On going':
        return <Badge variant="dot" color="primary"></Badge>
      case 'Done':
        return <Badge variant="dot" color="success"></Badge>
      default:
        return null
    }
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

  return (
    <React.Fragment>
      <ListItem
        sx={{ border: 'black', zIndex: 0 }}
        secondaryAction={
          <ButtonGroup>
            <Box sx={{ p: 0 }} onClick={() => setInGroup(!inGroup)}>
              {inGroup ? (
                <IconButton onClick={GroupOut}>
                  <WorkspacesIcon
                    sx={{
                      color: 'purple',
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={GroupIn}>
                  <WorkspacesIcon
                    sx={{
                      color: 'pink',
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </ButtonGroup>
        }
      >
        <ListItemText
          sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }}
          disableTypography
          onClick={() => {
            setSelectedTask(task)
            setSelectedGroups(groups)
            setSelectedUsers(staticUsers)
            handleClickOpen('paper')
            setOpenDialog(true)
          }}
        >
          {task.title}
        </ListItemText>
        <ListItemIcon sx={{ zIndex: 0 }}>
          {renderSwitch(task.status_name)}
        </ListItemIcon>
      </ListItem>
      <Dialog
        sx={{ width: '99.9%' }}
        open={openDialog}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: { xs: 18, sm: 24, md: 26, lg: 28 },
            padding: 2,
            textAlign: 'center',
          }}
        >
          タイトル
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <TaskDetail />
            <Group />
          </Grid>
        </DialogContent>
      </Dialog>
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

export default Task
