import Link from "next/link";
import Cookie from "universal-cookie";
import { useContext } from "react";
import { TaskContext } from "../../context/task";
import { TASK } from "@/types";
import { KeyedMutator } from "swr";

const cookie = new Cookie();

type Type = {
    task: TASK
    mutate: KeyedMutator<any>
  }

const Task: React.FC<Type> = ({ task, mutate }) => {
  const { setSelectedTask } = useContext(TaskContext);
  const deleteTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/${task.id}`, {
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
    <div>
      <span>{task.id}</span>
      {" : "}
      <Link href={`/task/${task.id}`}>       
          {task.title}
      </Link>
    </div>
  );
}

export default Task