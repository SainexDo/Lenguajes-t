import "../styles/Task.css";
import Input from "./Input";
import Button from "./Button";
import { useFetchPut } from "../hooks/useFetch";
import { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../pages/Home";

const Task = ({ currentTask }) => {
  const { currentUser, tasksRef, setTasks, setMsg, counter, setCounter } = useContext(TodoContext);
  const url = "http://localhost:3000";
  const { put, error } = useFetchPut();
  const checkboxRef = useRef();

  useEffect(() => {
    checkboxRef.current.checked = currentTask.completed;
  }, [currentTask.completed]);

  const completeTask = async () => {
    const updatedList = tasksRef.current.map((task) =>
      task.id === currentTask.id
        ? { ...task, completed: !task.completed }
        : task
    );
    const user = { ...currentUser.current, tasks: updatedList };
    const response = await put(url + user.id, user);
    if (response) {
      checkboxRef.current.checked ? setCounter(counter+1) : setCounter(counter-1);
      tasksRef.current = updatedList;
      setTasks(updatedList);
      setMsg("Tarea completada!");
    } else {
      setMsg(error);
    }
  };

  const deleteTask = async () => {
    const updatedList = tasksRef.current.filter((task) => task.id !== currentTask.id);
    const user = { ...currentUser.current, tasks: updatedList };
    const response = await put(url + user.id, user);
    if (response) {
      if (checkboxRef.current.checked)
        setCounter(counter-1);
      tasksRef.current = updatedList;
      setTasks(updatedList);
      setMsg("Tarea eliminada");
    } else {
      setMsg(error);
    }
  };

  return (
    <div className="task">
      <Input ref={checkboxRef} type={"checkbox"} handleClick={completeTask} />
      <p>{currentTask.title}</p>
      <Button type={"text"} text={"Eliminar"} handleClick={deleteTask} />
    </div>
  );
};

export default Task;
