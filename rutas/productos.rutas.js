const express=require("express")
const rutas=express.Router()
const{getProducts,postProducts}=require("../controladores/productos.controladores")

rutas.get("/",getProducts)

rutas.post("/",postProducts)


rutas.put("/",(req,res)=>{
    res.json("Metodo put")
})


rutas.delete("/",(req,res)=>{
    res.json("Metodo delete")
})

module.exports=rutas