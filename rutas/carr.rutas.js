const express=require("express")
const { } = require("../controladores/fav.controladores")
const { carrProduct, deleteCarr, CarPay } = require("../controladores/carr.controladores")
const rutas=express.Router()
const auth = require("../middelworlds/auth")

rutas.get("/",auth('user'),carrProduct)

rutas.post("/pay",CarPay)

rutas.delete("/:idProductCarr",auth('user'),deleteCarr)

module.exports=rutas