const usuariosModelo=require("../modelos/usuariosSchema")
const {resultVerify}=require("express-validator")
const{ validationResult }=require("express-validator");
let bcrypt = require('bcryptjs');
let jwt=require("jsonwebtoken");
const modeloUsuario = require("../modelos/usuariosSchema");
const carrModel = require("../modelos/carrSchema");
const favModel = require("../modelos/favSchema");



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

    const newUser= new usuariosModelo(req.body)

    let saltPass= bcrypt.genSaltSync(10)

    newUser.Contrasenia = bcrypt.hashSync(Contrasenia,saltPass)

    const newCarr= new carrModel({idUsuario: newUser._id})
    
    const newFav= new favModel({idUsuario: newUser._id})

    newUser.idCarr= newCarr._id
    newUser.idFav=newFav._id

    await newUser.save()
    await newCarr.save()
    await newFav.save()
    
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
        res.status(500).json({mensaje:'SERVER ERROR',error})
    }
    }


    const newpass= async (req,res)=>{
        console.log(req.body);
        try {
            const{Nombre,Correo,Contrasenia}=req.body

            console.log("1");

            const userExits= await usuariosModelo.findOne({Correo})

            console.log("2");

            if (!userExits) {
                res.status(500).json({mensaje:"El dato no existe en nuestra base de datos."})
                return
            }

            console.log("3");

            const userExitsName= await usuariosModelo.findOne({Nombre})

            console.log("4"); 

            if (!userExitsName) {
                res.status(500).json({mensaje:"El dato no existe en nuestra base de datos."})
                return
            }
            console.log("5");

            const salt = await bcrypt.genSalt(10); 

            console.log("6");

            const hashedPassword = await bcrypt.hash(Contrasenia, salt);

            const updetePass={
                Nombre,
                Correo,
                Contrasenia:hashedPassword
            }

           console.log("7");
   
            await usuariosModelo.findByIdAndUpdate({ _id: userExits._id },updetePass,{new:true});

            console.log("8");

            return res.status(200).json({ mensaje: "La contraseña ha sido restablecida correctamente." });

            
        } catch (error) {
            console.log(error)
        }
    }


const deleteUsers=async(req,res)=>{
    try {
       await usuariosModelo.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({mensaje:"Usuario eliminado correctamente"})
    } catch (error) {
        res.status(500).json({mensaje:'SERVER ERROR',error})
    }
}

    const loginRock= async (req,res)=>{
        try {
            const {Contrasenia,Correo}=req.body
            const identifiquerUser= await modeloUsuario.findOne({Correo})
            if (!identifiquerUser) {
                res.status(500).json({mensaje:"El usuario y/o la contraseña son incorrectos"})
                return
            }
            const comparePassaword= await bcrypt.compare(Contrasenia,identifiquerUser.Contrasenia)
            if (comparePassaword) {
                const payload={
                    idUsuario:identifiquerUser._id,
                    idCarr:identifiquerUser.idCarr,
                    idFav:identifiquerUser.idFav,
                    Role:identifiquerUser.Role,
                };
                const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"});
                return res.status (200).json ({mensaje:"Usuario Logeado",token,Role:identifiquerUser.Role,idUsuario:identifiquerUser._id});
            }else{
                return res.status(401).json({ mensaje: "El usuario y/o la contraseña son incorrectos" });
            }
        } catch (error) {
            return res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
}



    module.exports={
        getUsers,
        getUsersOne,
        postUsers,
        putUsers,
        newpass,
        deleteUsers,
        loginRock
    }