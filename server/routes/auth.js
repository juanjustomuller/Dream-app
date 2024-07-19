const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

/* Configuracion de Multer para la subida de files */
const storage = multer.diskStorage({
    // Configuración del destino donde se almacenarán los archivos
    destination: function(req, file, cb) {
        cb(null, "public/uploads") //'public/uploads' es el directorio donde se guardarán los archivos subidos
    },
    // Configuración del nombre del archivo
    filename: function(req, file, cb) {
        cb(null, file.originalname) //Se utiliza el nombre original del archivo
    }
})

const upload = multer({storage})

/* REGISTRO DE USUARIO */
//(upload.single('profileImage')Este middleware de Multer se utiliza para manejar una sola subida de archivo.
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        /*Tomar toda la informacion del formulario */
        const { firstName, lastName, email, password} = req.body

        /*El archivo cargado está disponible como req.file*/
        const profileImage = req.file

        if(!profileImage) {
            return res.status(400).send("No se cago ningun archivo")
        }


        // Obtener la ruta del archivo subido
        const profileImagePath = profileImage.path

        /*Chequeo si el usuario existe */
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(409).json({ message: "El usuario ya existe!"})
        }

        /*Encriptar la contraseña */
        const salt = await bcrypt.genSalt() //Encripta la contraseña usando el "salt"
        const hashedPassword = await bcrypt.hash(password, salt)

        /*Crear un nuevo usuario*/
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath
        })

        /*Guardar el nuevo usuario*/
        await newUser.save()

        /*Mandar un mensaje de extio*/
        res.status(200).json({message: "Usuario registrado con exito!", user: newUser})
    } catch (err) {
        console.log("error en register auth.js", err);
        res.status(500).json({message: "Fallo el registro", error: err.message})
    }
})

/* LOGUEO DE USUARIO POSTERIOR AL REGISTRO */
router.post("/login", async (req, res) => {
    try {
        //Obtener la informacion del formulario de logeo
        const {email, password} = req.body

        //Chequear si el usuario ya existe
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(409).json({ message: "El usuario no existe!"})
        }

        //Comparo la contraseña con la contraseña ingresada en el registro (hashed password)
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: "Las credenciales son invalidas!"})
        }

        //Generar JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
        delete user.password

        res.status(200).json({token, user})

    } catch (error) {
        console.log("error en login auth.js", error);
        res.status(500).json({message: error.message})
    }
})

module.exports = router