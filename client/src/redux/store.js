import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import state from "./state";

/*redux-persist es una librería que guarda el estado de Redux en el almacenamiento local 
del navegador, así que los datos no se pierden cuando recargas la página.*/
/*storage es el tipo de almacenamiento que se usará 
(en este caso, el almacenamiento local del navegador)*/


/*persistConfig define cómo y dónde se almacenará el estado persistido. 
En este caso, usa localStorage y le da una clave "root" */
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

/*persistedReducer es el reductor de Redux combinado con la funcionalidad de persistencia. 
state es tu reductor principal que contiene la lógica de tu estado.*/
const persistedReducer = persistReducer(persistConfig, state);

/*store es la tienda de Redux que usa el persistedReducer 
para guardar el estado en localStorage*/
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/*persistor se usa para gestionar el almacenamiento persistente del estado.*/
export let persistor = persistStore(store);