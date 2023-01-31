import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/task"
import Cookie from "universal-cookie";
import { KeyedMutator, useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { Box, Button, Container, Fab, FormControl, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CategoryContext } from "@/context/category";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { CATEGORY, NEW_CATEGORY } from "@/types";
import { getCategorys } from "@/api/category";
import { ColorContext } from "@/context/theme";


const cookie = new Cookie();

type Type = {
  staticCategorys: CATEGORY[]
  taskMutate: KeyedMutator<any>
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/category/`;

const TaskForm: React.FC<Type> = ({ staticCategorys, taskMutate }) => {
  const { editTask, setEditTask } = useContext(TaskContext);
  const { selectedColor } = useContext(ColorContext);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState<string>("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: categorys, error, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticCategorys,
    revalidateOnMount: true,
  })

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSelectStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value as string;
    setEditTask({ ...editTask, status: value })
  };

  const isCatDisabled = inputText.length === 0

  const isDisabled = 
    editTask.title.length === 0 ||
    editTask.description.length === 0 ||
    editTask.category === 0;

  const handleSelectCatChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value as number;
    setEditTask({ ...editTask, category: value })
  };

  let catOptions = categorys.map((cat: CATEGORY) => (
    <MenuItem key={cat.id} value={cat.id} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>
      {cat.item}
    </MenuItem>
  ));

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const newCategory = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/category/`, {
      method: "POST",
      body: JSON.stringify({ item: inputText }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setInputText("");
    mutate();
  };

  const create = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task/`, {
      method: "POST",
      body: JSON.stringify({ title: editTask.title, description: editTask.description, status: editTask.status, category: editTask.category }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    setEditTask({ id: 0, title: "", userTask: 0, description: "", status: "", category: 1, category_item: "",});
    taskMutate();
  };

  const update = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task/${editTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({title: editTask.title, description: editTask.description, status: editTask.status, category: editTask.category }),
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
    setEditTask({ id: 0, title: "", userTask: 0, description: "", status: "", category: 1, category_item: "",});
    taskMutate();
  };

  return (
    <Container component="main">
      <Box component="form" onSubmit={editTask.id !== 0 ? update : create} sx={{ width: "100%", flexDirection: 'column', alignItems: 'center',}}>
        <TextField
          id="standard-helperText"
          label="Title"
          fullWidth
          variant="standard"
          sx={{ fontSize: { xs: 10, sm: 14, md: 16, lg: 18 }, mt: 1}}
          inputProps={{style: { fontSize: 14}}}
          value={editTask.title}
          onChange={(e) =>
            setEditTask({ ...editTask, title: e.target.value })
        }
        />
        <TextField
          id="standard-helperText"
          label="Description"
          fullWidth
          variant="standard"
          sx={{ fontSize: { xs: 10, sm: 14, md: 16, lg: 18 }, mt: 1}}
          inputProps={{style: { fontSize: 14}}}
          value={editTask.description}
          onChange={(e) =>
            setEditTask({ ...editTask, description: e.target.value })
          }
        />
        <Box>
        <FormControl variant="standard" sx={{ mt: 1, minWidth: 90 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            sx={{ fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },}}
            value={editTask.status}
            onChange={handleSelectStatusChange}
          >
            <MenuItem value={1} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>Not started</MenuItem>
            <MenuItem value={2} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>On going</MenuItem>
            <MenuItem value={3} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 90 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            sx={{ fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },}}
            defaultValue={1}
            value={editTask.category}
            onChange={handleSelectCatChange}
          >
            {catOptions}
          </Select>
        </FormControl>

        <Fab
          size="small"
          // color="primary"
          sx={{ mt: 2, bgcolor: selectedColor, color: "white"}}
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
        // color="primary"
        disabled={isDisabled}
        sx={{ mt: 2, bgcolor: selectedColor, color: "white"}}
        >
          {editTask.id !== 0 ? "Update" : "Create"}
        </Button>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              label="New category"
              type="text"
              value={inputText}
              onChange={handleInputTextChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              sx={{ mt: 2, }}
              startIcon={<SaveIcon />}
              disabled={isCatDisabled}
              onClick={() => {
                newCategory();
                handleClose();
              }}
            >
              SAVE
            </Button>
          </Box>
        </Modal>
    </Container>
  );
}

export default TaskForm