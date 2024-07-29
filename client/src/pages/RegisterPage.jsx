import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const {name, value, files} = e.target
    setFormData({
        ...formData,
        [name]: value,
        [name]: name === "profileImage" ? files[0] : value
    })
  }

  console.log("formData", formData);

  /*Funcion de envio */
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  }, [formData.password, formData.confirmPassword])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
      const register_form = new FormData()

      for(var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })

      if(response.ok){
        navigate("/login")
      }
    } catch (error) {
      console.log("Registration failed", error.message)
    }
  }


  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input 
          placeholder="Nombre" 
          name="firstName" 
          value={formData.firstName}
          onChange={handleChange}
          required 
          />
          <input 
          placeholder="Apellido" 
          name="lastName"
          value={formData.lastName}
          onChange={handleChange} 
          required 
          />
          <input 
          type="email" 
          placeholder="Email" 
          name="email"
          value={formData.email}
          onChange={handleChange} 
          required 
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{color: "red"}}>Las contraseñas no coinciden!</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Carga tu foto de perfil</p>
          </label>
          {formData.profileImage && (
                <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Selected profile photo"
                style={{ maxWidth: "80px"}}
                />
            )}
          <button type="submit" disabled={!passwordMatch}>REGISTRAR</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
