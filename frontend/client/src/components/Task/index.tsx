import Link from "next/link";
import Cookie from "universal-cookie";
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/task";
import { SnackbarMessage, TASK } from "@/types";
import { KeyedMutator } from "swr";
import { Badge, Box, Button, ButtonGroup, Card, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const cookie = new Cookie();

type Type = {
    task: TASK
    mutate: KeyedMutator<any>
  }

const Task: React.FC<Type> = ({ task, mutate }) => {
  const { setEditTask, setSelectedTask } = useContext(TaskContext);
  const [open, setOpen] = useState(false)
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined,);

  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      } else {
        setSnackPack((prev) => [...prev, { message: "タスクを削除しました！", key: new Date().getTime() }]);
      }
    });
    mutate();
  };

  const renderSwitch = (statusName: string) => {
    switch (statusName) {
      case "Not started":
        return (
          <Badge variant="dot" color="error">
          </Badge>
        );
      case "On going":
        return (
          <Badge variant="dot" color="primary">
          </Badge>
        );
      case "Done":
        return (
          <Badge variant="dot" color="success">
          </Badge>
        );
      default:
        return null;
    }
  };

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
  
  return (
    <React.Fragment>
      <ListItem
        sx={{ border: "black", zIndex: 0}}
        secondaryAction={
          <ButtonGroup>
            <IconButton sx={{ border: "black"}} onClick={() => {
              setEditTask(task);
              setSelectedTask({
                id: 0,
                userTask: 0,
                title: "",
                description: "",
                status: "1",
                status_name: "",
                category: 0,
                category_item: "",
                created_at: "",
                updated_at: "",
              })
            }}>
              <BlurOnIcon />
            </IconButton>
            <IconButton sx={{ float: "right"}} onClick={deleteTask}>
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        }
      >
        <ListItemText sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },}} disableTypography onClick={() => {setSelectedTask(task);}}>{task.title}</ListItemText>
        <ListItemIcon sx={{ zIndex: 0}}>{renderSwitch(task.status_name)}</ListItemIcon>
      </ListItem>
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
            color="error"
            fullWidth
            onClick={handleBarClose}
            >
              {messageInfo?.message}
          </Button>
        </Snackbar>
    </React.Fragment>
  );
}

export default Task