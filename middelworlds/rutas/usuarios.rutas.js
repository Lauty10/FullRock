const express=require("express")
const rutas = express.Router()
const {getUsers,getUsersOne,postUsers,deleteUsers,putUsers,loginRock, passNew}=require("../controladores/usuarios.controladores")
const {check}=require("express-validator")
const auth = require("../middelworlds/auth")

rutas.get("/",getUsers)

rutas.get("/:id",getUsersOne)

rutas.post("/",postUsers)

rutas.put("/pass",passNew)   

rutas.post("/login",[
    check("Correo","Campo Vacio").notEmpty(),
    check("Correo","Formato Incorrecto").isEmail(),
    check("Nombre","El formato no es correcto").isAlpha(),
    check("Nombre","El nombre es muy largo").isLength({min:2, max:20}),
    check("Nombre","Campo Vacio").isEmpty(),
    check("Contrasenia","Campo vacio").isEmpty(),
    check("Contrasenia","La clave es muy corta").isLength({min:8,max:16}),
    check("Nacionalidad","El formato es incorrecto").isAlpha(),
    check("Nacionalidad","Campo vacio").isEmpty()
    
],loginRock)

rutas.put("/:id",[
    check("Correo","No se puede actualizar con campo vacio").notEmpty(),
    check("Correo","No se puede actualizar con este formato").isEmail(),
    check("Nombre","El formato no es correcto para actualizar").isAlpha(),
    check("Nombre","El nombre es muy largo para actualizar").isLength({min:2, max:20}),
    check("Nombre","No se puede actualizar con campo vacio").isEmpty(),
    check("Contrasenia","No se puede actualizar con campo vacio").isEmpty(),
    check("Contrasenia","La clave es muy corta para actualizar").isLength({min:8,max:16}),
    check("Nacionalidad","El formato es incorrecto para actualizar").isAlpha(),
    check("Nacionalidad","No se puede actualizar con campo vacio").isEmpty()
],auth('admin'),putUsers)

rutas.delete("/:id",auth('admin'),deleteUsers)


module.exports=rutas