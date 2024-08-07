const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const authRoutes = require("./routes/auth.js") //authRoute es una variable que almacena las rutas definidas en auth.js
const listingRoutes = require("./routes/listing.js") //listingRoute es una variable que almacena las rutas definidas en listing.js
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

/*RUTAS*/
app.use("/auth", authRoutes) //le dice a Express que cuando alguien haga una solicitud a /auth, se debe manejar con las rutas definidas en authRoute
app.use("/properties", listingRoutes) 
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

/*MOONGOSE SETUP*/
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {dbName: "Dream_app"})
    .then(() => {
        app.listen(PORT, () => console.log(`Puerto ${PORT} corriendo en el servidor`));
    })
    .catch((err) => console.log(`${err} did not connect`));