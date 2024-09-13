import { createContext, useEffect, useRef, useState } from "react";
import { validateEmpty } from "../utils/validations";
import { useFetchGet, useFetchPut } from "../hooks/useFetch";
import Form from "../components/Form";
import Input from "../components/Input";
import Task from "../components/Task";
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext();

const Home = () => {
  const url = "http://localhost:3000/api/";
  const id = localStorage.getItem("id");
  const inputRef = useRef();
  const tasksRef = useRef([]);
  const currentUser = useRef({});
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState("");
  const [counter, setCounter] = useState(0);
  const { get, isLoading: getIsLoading, error: getError } = useFetchGet();
  const { put, isLoading: putIsLoading, error: putError } = useFetchPut();

  useEffect(() => {
    (async () => {
      const data = await get(url + id);
      if (data) {
        let count = 0;
        currentUser.current = data;
        if (data.tasks) {
          tasksRef.current = data.tasks;
          count = data.tasks.filter(task => task.completed).length;
          setCounter(count);
          setTasks(data.tasks);
        }
      } else setMsg(getError);
    })();
  }, [id]);

  const createTask = async (e) => {
    e.preventDefault();
    const inputTxt = inputRef.current.value;
    if (validateEmpty(inputTxt)) {
      if (currentUser.current) {
        const task = {
          id: uuidv4(),
          title: inputTxt,
          completed: false,
        };
        const updatedTasks = [...tasksRef.current, task];
        const user = { ...currentUser.current, tasks: updatedTasks };
        const response = await put(url + id, user);
        if (response) {
          tasksRef.current = updatedTasks;
          setTasks(updatedTasks);
        } else {
          setMsg(putError);
        }
      } else {
        setMsg(getError);
      }
    } else {
      setMsg("Por favor ingrese un texto.");
    }
  };

  return (
    <TodoContext.Provider
      value={{
        currentUser,
        tasksRef,
        counter,
        setTasks,
        setMsg,
        setCounter,
      }}
    >
      {getIsLoading || putIsLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <p>{counter}</p>
          <Form handleSubmit={createTask}>
            <Input ref={inputRef} type={"text"} placeholder={"Tarea"} />
            <Input type={"submit"} value={"Agregar Tarea"} />
          </Form>
          <p>{msg}</p>
          {tasks.map((task) => (
            <Task key={task.id} currentTask={task} />
          ))}
        </>
      )}
    </TodoContext.Provider>
  );
};

export default Home;
