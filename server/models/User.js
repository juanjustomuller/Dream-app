const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImagePath: {
    //para que tome la URL de la imagen
    type: String,
    default: "",
  },
  //UNA VEZ LOGUEADO, ESTE ES EL ESQUEMA PARA LO QUE PUEDE HACER EL USUARIO LOGUEADO
  tripList: {
    //lista de viajes
    type: Array,
    default: [],
  },
  wishList: {
    //lista de deseos
    type: Array,
    default: [],
  },
  propertyList: {
    //lista de propiedades
    type: Array,
    default: [],
  },
  reservationList: {
    //lista de reservas
    type: Array,
    default: [],
  },
},
    { timestamps: true } //sirve para saber cuando el usuario se registre
);

const User = mongoose.model("User", UserSchema)
module.exports = User
