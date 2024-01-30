const express=require("express")
const { getFav, deletefav } = require("../controladores/fav.controladores")
const rutas=express.Router()
const auth = require("../middelworlds/auth")

rutas.get("/",auth('user'),getFav)

rutas.delete("/:idProduct",auth('user'),deletefav)

module.exports=rutas