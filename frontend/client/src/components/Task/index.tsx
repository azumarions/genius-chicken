import Link from "next/link";
import Cookie from "universal-cookie";
import React, { useContext } from "react";
import { TaskContext } from "../../context/task";
import { TASK } from "@/types";
import { KeyedMutator } from "swr";
import { Box, Button, ButtonGroup, Card, IconButton, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
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
      }
    });
    mutate();
  };
  
  return (
    <React.Fragment>
      <ListItem
        sx={{ border: "black"}}
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
                category_name: "",
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
        <ListItemText sx={{ textAlign: "left"}} onClick={() => setSelectedTask(task)}>{task.title}</ListItemText>
      </ListItem>
    </React.Fragment>
  );
}

export default Task