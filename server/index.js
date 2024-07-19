const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const authRoute = require("./routes/auth.js") //authRoute es una variable que almacena las rutas definidas en auth.js

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

/*RUTAS*/
app.use("/auth", authRoute) //le dice a Express que cuando alguien haga una solicitud a /auth, se debe manejar con las rutas definidas en authRoute

/*MOONGOSE SETUP*/
const PORT = 3001;
mongoose.connect(process.env.MONGO_URL, {dbName: "Dream_app"})
    .then(() => {
        app.listen(PORT, () => console.log(`Puerto ${PORT} corriendo en el servidor`));
    })
    .catch((err) => console.log(`${err} did not connect`));