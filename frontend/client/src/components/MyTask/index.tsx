import Cookie from 'universal-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../context/task'
import { CATEGORY, GROUP, SnackbarMessage, TASK, USER } from '@/types'
import { KeyedMutator } from 'swr'
import {
  Badge,
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
} from '@mui/material'
import BlurOnIcon from '@mui/icons-material/BlurOn'
import DeleteIcon from '@mui/icons-material/Delete'
import TaskForm from '../TaskForm'
import TaskDetail from '../TaskDetail'
import { GroupContext } from '@/context/group'
import { UserContext } from '@/context/user'
import Group from '../Group'

const cookie = new Cookie()

type Type = {
  task: TASK
  staticCategorys: CATEGORY[]
  staticGroups: any
  staticUsers: USER[]
  taskMutate: KeyedMutator<any>
}

const MyTask: React.FC<Type> = ({
  task,
  staticCategorys,
  staticGroups,
  staticUsers,
  taskMutate,
}) => {
  const { setEditTask, selectedTask, setSelectedTask } = useContext(TaskContext)
  const { setSelectedGroups } = useContext(GroupContext)
  const { setSelectedUsers } = useContext(UserContext)

  const group: GROUP = staticGroups.find(
    (group: GROUP) =>
      group.taskGroup === task.id &&
      staticUsers.map((user) => user.id === group.userGroup)
  )
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')
  const [open, setOpen] = useState(false)

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [scrollTaskForm, setScrollTaskForm] =
    useState<DialogProps['scroll']>('paper')
  const [openTaskForm, setOpenTaskForm] = useState(false)

  const OpenTaskForm = (scrollType: DialogProps['scroll']) => () => {
    setOpenTaskForm(true)
    setScrollTaskForm(scrollType)
  }

  const CloseTaskForm = () => {
    setOpenTaskForm(false)
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

  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      } else {
      }
    })
    taskMutate()
  }

  return (
    <React.Fragment>
      <ListItem
        secondaryAction={
          <ButtonGroup>
            <IconButton
              sx={{ border: 'black' }}
              onClick={() => {
                setEditTask(task)
                OpenTaskForm('paper')
                setOpenTaskForm(true)
              }}
            >
              <BlurOnIcon />
            </IconButton>
            <IconButton sx={{ float: 'right' }} onClick={deleteTask}>
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        }
      >
        <ListItemText
          sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }}
          disableTypography
          onClick={() => {
            setSelectedTask(task)
            setSelectedGroups(staticGroups)
            setSelectedUsers(staticUsers)
            handleClickOpen('paper')
            setOpen(true)
          }}
        >
          {task.title}
        </ListItemText>
        <ListItemIcon sx={{ zIndex: 0 }}>
          {renderSwitch(task.status_name)}
        </ListItemIcon>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        // scroll={scroll}
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
          {selectedTask.title}
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
      <Dialog
        open={openTaskForm}
        onClose={CloseTaskForm}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <TaskForm
              staticCategorys={staticCategorys}
              taskMutate={taskMutate}
              CloseTaskForm={CloseTaskForm}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default MyTask
