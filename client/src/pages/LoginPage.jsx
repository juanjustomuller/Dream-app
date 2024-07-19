import React, { useState } from "react";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({email, password})
      })
  
      //Obtener la data dsp del fetching
      /*Si el inicio de sesión es exitoso, se usa dispatch para enviar la acción setLogin 
      y se guarda la información del usuario y el token en el estado global.*/
      const loggedIn = await response.json()
      if(loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (error) {
      console.log("error del handlesubmit del login", error);
      res.send(500).json({message: error.message})
    }

  }
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">INGRESAR</button>
        </form>
        <a href="/register">Don't have an account? Sing In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
