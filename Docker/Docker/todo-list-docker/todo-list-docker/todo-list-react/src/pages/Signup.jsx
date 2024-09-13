import { useRef, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { validateEmpty, validateSpaces } from "../utils/validations";
import { useFetchGet, useFetchPost } from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const url = "http://localhost:3000/api/";
  // refs
  const userRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  // states
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  // hooks
  const { get, isLoading: getIsLoading, error: getError } = useFetchGet();
  const { post, isLoading: postIsLoading, error: postError } = useFetchPost();

  const signup = async (e) => {
    e.preventDefault();

    let userInput = userRef.current.value;
    let passInput = passRef.current.value;
    let confirmInput = confirmRef.current.value;

    // validations
    if (validateEmpty(userInput, passInput)) {
      if (validateSpaces(userInput, passInput)) {
        if (passInput === confirmInput) {
          // clear inputs
          userRef.current.value = "";
          passRef.current.value = "";
          confirmRef.current.value = "";

          const data = await get(url);

          if (data) {
            // check if the username already exists
            const exists = data.find((user) => user.username === userInput);
            if (!exists) {
              // create new user
              const newUser = { username: userInput, password: passInput };
              const response = await post(url, newUser);
              if (response) {
                setMsg("Usuario creado con éxito, redirigiendo al login...");
                // redirect to login after 1 second
                setTimeout(() => {
                  navigate("/login");
                }, 1000);
              } else {
                setMsg(postError);
              }
            } else {
              setMsg(
                <>
                  El usuario ya existe, <Link to={"/login"}>inicie sesión</Link>
                </>
              );
            }
          } else {
            setMsg(getError);
          }
        } else {
          setMsg("Contraseñas no coinciden");
        }
      } else {
        setMsg("Por favor no ingrese espacios vacíos");
      }
    } else {
      setMsg("Por favor llene los campos");
    }
  };

  return (
    <>
      {getIsLoading || postIsLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Form handleSubmit={signup}>
            <Input ref={userRef} type="text" placeholder="User" />
            <Input ref={passRef} type="password" placeholder="Password" />
            <Input ref={confirmRef} type="password" placeholder="Password" />
            <Input type={"submit"} value={"Registrarse"} />
          </Form>
          <Link to={"/login"}>Iniciar Sesión</Link>
          <p>{msg}</p>
        </>
      )}
    </>
  );
};

export default Signup;
