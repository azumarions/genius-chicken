import { createContext, Dispatch, useState } from "react";
import { TASK } from "../../types"

type TaskContextType = {
    selectedTask: TASK
    setSelectedTask: Dispatch<React.SetStateAction<TASK>>
  }
  
  interface TaskContextProviderProps {
    children: React.ReactNode
  }
  
  export const TaskContext = createContext<TaskContextType>(
    {} as {
      selectedTask: TASK
      setSelectedTask: Dispatch<React.SetStateAction<TASK>>
    }
  );

export default function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [selectedTask, setSelectedTask] = useState({ id: 0, userTask: 0, title: "", description: "", status: "", created_at: "" });
  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}