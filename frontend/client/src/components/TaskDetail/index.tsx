import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useContext } from "react";
import { TaskContext } from "../../context/task"


const TaskDetail: React.FC = () => {
  const { selectedTask } = useContext(TaskContext);
  const rows = [
    { item: "タイトル", data: selectedTask.title },
    { item: "詳細", data: selectedTask.description },
    { item: "状態", data: selectedTask.status_name },
    { item: "作成日", data: selectedTask.created_at },
  ];

  if (!selectedTask.title) {
    return null;
  }
  
  return (
    <>
    <Table>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.item}>
            <TableCell align="center">
              <strong>{row.item}</strong>
            </TableCell>
            <TableCell align="center">{row.data}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
  );
}

export default TaskDetail