import { useRef, useContext, useState } from "react";
import { validateEmpty } from "../utils/validations";
import { Link, useNavigate } from "react-router-dom";
import { useFetchGet } from "../hooks/useFetch";
import { AuthContext } from "../contexts/AuthProvider";
import Form from "../components/Form";
import Input from "../components/Input";

const Login = () => {
  const url = "http://localhost:3000/api/";
  // ref
  const userRef = useRef();
  const passRef = useRef();
  // states
  const [msg, setMsg] = useState("");
  // context
  const { login } = useContext(AuthContext);
  // navigate
  const navigate = useNavigate();
  // custom hook
  const { get, isLoading, error } = useFetchGet();
  const loginUser = async (e) => {
    e.preventDefault();
    let userInput = userRef.current.value;
    let passInput = passRef.current.value;
    if (validateEmpty(userRef.current.value)) {
      const data = await get(url);
      if (data) {
        const user = data.find((user) => user.username === userInput);
        if (user) {
          if (user.password === passInput) {
            setMsg("Inicio de sesión éxitoso!");
            localStorage.setItem("id", user.id);
            setTimeout(() => {
              login();
              navigate("/home");
            }, 1000);
          } else setMsg("Usuario y contraseña no coinciden");
        } else setMsg("Nombre de usuario no existe.");
      } else setMsg(error);
    } else setMsg("Por favor llene los campos");
  };
  return (
    <>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Form handleSubmit={loginUser}>
            <Input ref={userRef} type="text" placeholder="User" />
            <Input ref={passRef} type="password" placeholder="Password" />
            <Input
              type={"submit"}
              value={"Iniciar sesión"}
            />
          </Form>
          <Link to={"/signup"}>Registrarse</Link>
          <p>{msg}</p>
        </>
      )}
    </>
  );
};

export default Login;
