import { useContext } from "react";
import { TaskContext } from "../../context/task"
import Cookie from "universal-cookie";
import { KeyedMutator } from "swr";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const cookie = new Cookie();

type Type = {
    mutate: KeyedMutator<any>
}

const TaskForm: React.FC<Type> = ({ mutate }) => {
  const { selectedTask, setSelectedTask, editTask, setEditTask } = useContext(TaskContext);

  const handleSelectStatusChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = e.target.value as string;
    setEditTask({ ...editTask, status: value })
  };

  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task/`, {
      method: "POST",
      body: JSON.stringify({ title: editTask.title, description: editTask.description, status: editTask.status }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setEditTask({ id: 0, title: "", userTask: 0, description: "", status: "", });
    mutate();
  };
  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task/${editTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({title: editTask.title, description: editTask.description, status: editTask.status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setEditTask({ id: 0, title: "", userTask: 0, description: "", status: "", });
    mutate();
  };
  return (
    <Container component="main">
      <Box component="form" onSubmit={editTask.id !== 0 ? update : create} sx={{ width: "100%", flexDirection: 'column', alignItems: 'center',}}>
        <TextField
          id="standard-helperText"
          label="タイトル"
          fullWidth
          variant="standard"
          value={editTask.title}
          onChange={(e) =>
            setEditTask({ ...editTask, title: e.target.value })
        }
        />
        <TextField
          id="standard-helperText"
          label="詳細"
          fullWidth
          variant="standard"
          value={editTask.description}
          onChange={(e) =>
            setEditTask({ ...editTask, description: e.target.value })
          }
        />
        <Box>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={editTask.status}
            onChange={handleSelectStatusChange}
          >
            <MenuItem value={1}>Not started</MenuItem>
            <MenuItem value={2}>On going</MenuItem>
            <MenuItem value={3}>Done</MenuItem>
          </Select>
        </FormControl>
        {/* </Box>
        <Box> */}
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        >
          {editTask.id !== 0 ? "更新" : "作成"}
        </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TaskForm