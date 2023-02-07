import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/task"
import Cookie from "universal-cookie";
import { KeyedMutator } from "swr";
import useSWR from "swr";
import { Alert, Badge, Box, Button, Card, Container, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { CATEGORY, SnackbarMessage } from "@/types";
import CloseIcon from '@mui/icons-material/Close';


const cookie = new Cookie();

type Type = {
  staticCategorys: CATEGORY[]
  taskMutate: KeyedMutator<any>
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/category/`;

const TaskForm: React.FC<Type> = ({ staticCategorys, taskMutate }) => {
  const { editTask, setEditTask } = useContext(TaskContext);
  const [openModal, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [inputText, setInputText] = useState<string>("")
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined,);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
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
    <MenuItem key={cat.id} value={cat.id} defaultValue={1} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>
      {cat.item}
    </MenuItem>
  ));

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
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
      } else {
        setSnackPack((prev) => [...prev, { message: "カテゴリーを作成しました！", key: new Date().getTime() }]);
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
      } else {
        setSnackPack((prev) => [...prev, { message: "タスクを作成しました！", key: new Date().getTime() }]);
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
      } else {
        setSnackPack((prev) => [...prev, { message: "タスクを更新しました！", key: new Date().getTime() }]);
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
          sx={{ fontSize: { xs: 10, sm: 14, md: 16, lg: 18 },}}
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
            <MenuItem value={1} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>
              <Badge variant="dot" color="error">
                Not started
              </Badge>
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>
              <Badge variant="dot" color="primary">
                On going
              </Badge>
            </MenuItem>
            <MenuItem value={3} sx={{ fontSize: { xs: 14, sm: 14, md: 16, lg: 18 },}}>
              <Badge variant="dot" color="success">
                Done
              </Badge>
            </MenuItem>
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
          color="success"
          sx={{ mt: 2, }}
          onClick={handleModalOpen}
        >
          <AddIcon />
        </Fab>
        </Box>
        <Box>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        disabled={isDisabled}
        sx={{ mt: 2, }}
        >
          {editTask.id !== 0 ? "Update" : "Create"}
        </Button>
        </Box>
      </Box>
      <Modal open={openModal} onClose={handleModalClose}>
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
              color="success"
              fullWidth
              size="small"
              sx={{ mt: 2, }}
              startIcon={<SaveIcon />}
              disabled={isCatDisabled}
              onClick={() => {
                newCategory();
                handleModalClose();
              }}
            >
              SAVE
            </Button>
          </Box>
        </Modal>
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={5000}
          onClose={handleBarClose}
          TransitionProps={{ onExited: handleExited }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleBarClose}
            >
              {messageInfo?.message}
          </Button>
        </Snackbar>
    </Container>
  );
}

export default TaskForm