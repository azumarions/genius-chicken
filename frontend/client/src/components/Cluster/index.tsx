import { ClusterContext } from '@/context/cluster'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import Router from 'next/router'
import { useContext } from 'react'
import { TaskContext } from '../../context/task'
import router from 'next/router'
import { GroupContext } from '@/context/group'
import { UserContext } from '@/context/user'

const Cluster: React.FC = () => {
  const { selectedTask } = useContext(TaskContext)
  const { selectedGroups } = useContext(GroupContext)
  const { selectedUsers } = useContext(UserContext)

  //   const taskCluster = selectedCluster.filter((cluster) => {
  //     cluster.taskCluster === selectedTask.id
  //   })

  const filterGroups = selectedGroups.filter(
    (group) => group.taskGroup === selectedTask.id
  )
  const rows = [
    // { item: 'Id', data: taskCluster },
    {
      item: 'Users',
      data: filterGroups.map((group) => (
        <Box
          key={
            selectedUsers.find((user) => user.userProfile === group.userGroup)
              ?.id
          }
        >
          <Button
            color="inherit"
            onClick={() => {
              router.push(
                `/user/${
                  selectedUsers.find(
                    (user) => user.userProfile === group.userGroup
                  )?.id
                }`
              )
            }}
          >
            <Typography variant="caption">
              {
                selectedUsers.find(
                  (user) => user.userProfile === group.userGroup
                )?.name
              }
            </Typography>
          </Button>
        </Box>
      )),
    },
  ]

  if (!selectedTask.title) {
    return null
  }

  return (
    <>
      <Table sx={{ mt: 1 }}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell
                align="center"
                sx={{ p: 1, fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }}
              >
                {row.item}
              </TableCell>
              <TableCell
                align="center"
                sx={{ p: 1, fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }}
              >
                {row.data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Cluster
