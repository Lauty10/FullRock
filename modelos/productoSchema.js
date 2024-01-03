const mongoose=require("mongoose")
const productoModelo= new mongoose.Schema({
    Nombre:{
        type:String,
        require:true
    },
    Precio:{
        type:Number,
        require:true
    },
    Descripcion:{
        type:String,
        require:true
    },
    Marca:{
        type:String,
        require:true
    },
})

const modeloProducto=mongoose.model("Producto",productoModelo);
module.exports=modeloProducto