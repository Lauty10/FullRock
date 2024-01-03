const express=require("express")
const rutas = express.Router()
const {getUsers,getUsersOne,postUsers,deleteUsers,putUsers}=require("../controladores/usuarios.controladores")

rutas.get("/",getUsers)


rutas.get("/:id",getUsersOne)


rutas.post("/",postUsers)



rutas.put("/:id",putUsers)



rutas.delete("/:id",deleteUsers)


module.exports=rutas