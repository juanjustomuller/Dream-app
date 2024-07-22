import { createSlice } from "@reduxjs/toolkit"; //createSlice es una función de Redux Toolkit que simplifica la creación de "slices" de estado

const initialState = {
    user: null, 
    password: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    /*reducers define las funciones que permiten modificar el estado. Aquí, setLogin es un reductor que actualiza el estado con la información del usuario y el token.*/
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogOut: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const {setLogin, setLogOut} = userSlice.actions
export default userSlice.reducer

//userSlice.actions contiene las acciones generadas por el slice. setLogin se exporta para que pueda ser usado en otros componentes o archivos.
//userSlice.reducer se exporta como el reducer que debe ser utilizado en la configuración del store de Redux.