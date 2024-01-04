const express=require("express")
const multer=require("../middelworlds/multer")
const rutas=express.Router()
const{getProducts,getProductOne,postProducts,putProducts,deleteProduct}=require("../controladores/productos.controladores")

rutas.get("/",getProducts)

rutas.get("/:id",getProductOne)

rutas.post("/",multer.single('Imagen'),postProducts)

rutas.put("/:id",putProducts)

rutas.delete("/:id",deleteProduct)

module.exports=rutas