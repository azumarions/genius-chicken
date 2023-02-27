import Cookie from 'universal-cookie'
import React, { useContext, useState } from 'react'
import { TaskContext } from '../../context/task'
import { TASK } from '@/types'
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
import DeleteIcon from '@mui/icons-material/Delete'
import TaskDetail from '../TaskDetail'

const cookie = new Cookie()

type Type = {
  task: TASK
  //   staticCategorys: CATEGORY[]
}

const UserTask: React.FC<Type> = ({ task }) => {
  const { editTask, setEditTask, selectedTask, setSelectedTask } =
    useContext(TaskContext)
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

  return (
    <React.Fragment>
      <ListItem
        secondaryAction={
          <ButtonGroup>
            <IconButton sx={{ float: 'right' }}>
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
        {/* <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: { xs: 18, sm: 24, md: 26, lg: 28 },
            padding: 2,
            textAlign: 'center',
          }}
        >
          {editTask.title}
        </DialogTitle> */}
        <DialogContent dividers={scroll === 'paper'}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            task
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default UserTask
