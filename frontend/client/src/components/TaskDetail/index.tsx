import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useContext } from 'react'
import { TaskContext } from '../../context/task'

const TaskDetail: React.FC = () => {
  const { selectedTask } = useContext(TaskContext)
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

export default TaskDetail
