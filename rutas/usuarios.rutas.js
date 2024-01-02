const express=require("express")
const rutas = express.Router()

rutas.get("/",(req,res)=>{
    res.json("Metodo get")
})


rutas.post("/",(req,res)=>{
    res.json("Metodo post")
})



rutas.put("/",(req,res)=>{
    res.json("Metodo put")
})



rutas.delete("/",(req,res)=>{
    res.json("Metodo delete")
})


module.exports=rutas