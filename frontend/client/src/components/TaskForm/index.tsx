import { useContext, useState } from "react";
import { TaskContext } from "../../context/task"
import Cookie from "universal-cookie";
import { KeyedMutator } from "swr";
import { Box, Button, Container, Fab, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { CategoryContext } from "@/context/category";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const cookie = new Cookie();

type Type = {
    mutate: KeyedMutator<any>
}

const TaskForm: React.FC<Type> = ({ mutate }) => {
  const { selectedTask, setSelectedTask, editTask, setEditTask } = useContext(TaskContext);
  const { categorys, setCategorys } = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSelectStatusChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = e.target.value as string;
    setEditTask({ ...editTask, status: value })
  };

  const isCatDisabled = inputText.length === 0;

  const handleSelectCatChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as number;
    setEditTask({ ...editTask, category: value })
  };

  let catOptions = categorys.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.item}
    </MenuItem>
  ));

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
    setEditTask({ id: 0, title: "", userTask: 0, description: "", status: "", category: 0, category_name: "",});
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
    setEditTask({ id: 0, title: "", userTask: 0, description: "", status: "", category: 0, category_name: "",});
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={editTask.category}
            onChange={handleSelectCatChange}
          >
            {catOptions}
          </Select>
        </FormControl>

        <Fab
          size="small"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
        </Box>
        <Box>
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
      <Modal open={open} onClose={handleClose}>
          <div>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label="New category"
              type="text"
              value={inputText}
              onChange={handleInputTextChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              disabled={isCatDisabled}
              // onClick={() => {
              //   dispatch(fetchAsyncCreateCategory(inputText));
              //   handleClose();
              // }}
            >
              SAVE
            </Button>
          </div>
        </Modal>
    </Container>
  );
}

export default TaskForm