const express=require("express")
const { } = require("../controladores/fav.controladores")
const { carrProduct, deleteCarr } = require("../controladores/carr.controladores")
const rutas=express.Router()
const auth = require("../middelworlds/auth")

rutas.get("/",carrProduct)

rutas.delete("/:idProductCarr",auth('user'),deleteCarr)

module.exports=rutas