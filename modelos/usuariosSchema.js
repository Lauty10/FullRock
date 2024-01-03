const mongoose=require("mongoose")
const usuariosSchema= new mongoose.Schema({
    Nombre:{
        type:String,
        require:true
    },
    Correo:{
        type:String,
        require:true
    },
    Contrasenia:{
        type:String,
        require:true
    },
    Nacionalidad:{
        type:String,
        require:true
    },
    Role:{
        type:String,
        default:"user"
    }
})

const modeloUsuario=mongoose.model("Usuarios",usuariosSchema)
module.exports=modeloUsuario