import Link from 'next/link'
import Cookie from 'universal-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../context/task'
import { SnackbarMessage, TASK } from '@/types'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
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
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import BlurOnIcon from '@mui/icons-material/BlurOn'
import { Box } from '@mui/system'
import { Group } from '@mui/icons-material'

const cookie = new Cookie()

type Type = {
  task: TASK
}

const UserTask: React.FC<Type> = ({ task }) => {
  const { setEditTask, selectedTask, setSelectedTask } = useContext(TaskContext)
  const [group, setGroup] = useState(false)
  const rows = [
    // { item: "Id", data: selectedTask.id},
    { item: 'Title', data: selectedTask.title },
    { item: 'Description', data: selectedTask.description },
    { item: 'Status', data: selectedTask.status_name },
    { item: 'Access', data: selectedTask.access_name },
    { item: 'Estimate', data: selectedTask.estimate },
    { item: 'Category', data: selectedTask.category_item },
    { item: 'Create', data: selectedTask.created_at },
    { item: 'Update', data: selectedTask.updated_at },
  ]
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper')
  const [open, setOpen] = useState(false)

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
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
      // onClick={() => {
      //     handleClickOpen('paper')
      //   setOpen(true)
      //   setSelectedTask(task)
      // }}
      // sx={{ border: 'black', zIndex: 0 }}
      // // secondaryAction={<Group />}
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
        <ListItemIcon onClick={() => setGroup(!group)}>
          {group ? (
            <IconButton sx={{ p: 0 }}>
              <WorkspacesIcon
                sx={{
                  color: 'purple',
                }}
              />
            </IconButton>
          ) : (
            <IconButton sx={{ p: 0 }}>
              <WorkspacesIcon
                sx={{
                  color: 'pink',
                }}
              />
            </IconButton>
          )}
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
            <Table sx={{ mt: 1 }}>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.item}>
                    <TableCell
                      align="center"
                      sx={{
                        p: 1,
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      }}
                    >
                      {row.item}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        p: 1,
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
                      }}
                    >
                      {row.data}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          {/* <PostDialog key={post.id} postId={post.id} userPost={post.userPost} /> */}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default UserTask
