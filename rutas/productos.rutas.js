const express=require("express")
const multer=require("../middelworlds/multer")
const rutas=express.Router()
const{getProducts,getProductOne,postProducts,putProducts,deleteProduct}=require("../controladores/productos.controladores")
const{check}=require("express-validator")

rutas.get("/",getProducts)

rutas.get("/:id",getProductOne)

rutas.post("/",multer.single('Imagen'),[
        check("Nombre","Campo Vacio").isEmpty(),
        check("Precio","El formato no es correcto").isNumeric(),
        check("Precio","Campo Vacio").isEmpty(),
        check("Descripcion","Campo Vacio").isEmpty(),
        check("Marca","Campo Vacio").isEmpty(),
        check("Imagen","Campo Vacio").isFile()
        
],postProducts)

rutas.put("/:id",[
    check("Nombre","Campo Vacio").isEmpty(),
    check("Precio","El formato no es correcto").isNumeric(),
    check("Precio","Campo Vacio").isEmpty(),
    check("Descripcion","Campo Vacio").isEmpty(),
    check("Marca","Campo Vacio").isEmpty(),
    check("Imagen","Campo Vacio").isFile()

],putProducts)

rutas.delete("/:id",deleteProduct)

module.exports=rutas