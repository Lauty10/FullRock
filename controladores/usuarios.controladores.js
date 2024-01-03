const usuariosModelo=require("../modelos/usuariosSchema")
const {resultVerify}=require("express-validator")
const{ validationResult }=require("express-validator");
const modeloProducto = require("../modelos/productoSchema");
let bcrypt = require('bcryptjs');



const getUsers=async(req,res)=>{
    try {
        const getUserAll=await usuariosModelo.find()
        res.status(200).json({mensaje:"Usuarios encontrados:",getUserAll})
    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
    }
}


const getUsersOne= async(req,res)=>{
    try {
        const getUserAllOne= await usuariosModelo.findOne({_id:req.params.id})
        res.status(200).json({mensaje:"Usuario encontrado:",getUserAllOne})
    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
    }
}


const postUsers=async(req,res)=>{
   try {
    const dataVerify=validationResult(req)
    if (!dataVerify.isEmpty()) {
        return res.status(422).json({mensaje:result.array()})
    }
    const {Correo,Contrasenia}=req.body;

    const searchCorreo= await usuariosModelo.findOne({Correo})

    if (searchCorreo) {
        res.status(500).json({mensaje:"El usuario ya existe en la base de datos"})
        return

    }else{

    const newUser= new modeloProducto(req.body)

    let saltPass= bcrypt.genSaltSync(10)

    newUser.Contrasenia = bcrypt.hashSync(Contrasenia,saltPass)

    await newUser.save()
    
    res.status(200).json({mensaje:"Usuario creado correctamente",newUser})

    }

   } catch (error) {
           res.status(500).json({mensaje:"ERROR",error})
   }
}



const putUsers=async(req,res)=>{
    try {
        const updeteUsers= await usuariosModelo.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json({mensaje:'Usuario actualizado correctamente',updeteUsers})
    } catch (error) {
        res.status(500).json({mensaje:'SERVER ERROR'},error)
    }
    }


const deleteUsers=async(req,res)=>{
    try {
        const deleteUs= await usuariosModelo.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({mensaje:"Usuario eliminado correctamente",deleteUs})
    } catch (error) {
        res.status(500).json({mensaje:'SERVER ERROR'},error)
    }
}



    module.exports={
        getUsers,
        getUsersOne,
        postUsers,
        putUsers,
        deleteUsers
    }