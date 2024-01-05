const modeloProducto=require("../modelos/productoSchema")
const{ validationResult }=require("express-validator");
const cloudinary=require("../helps/cloudinary")

const getProducts= async(req,res)=>{
    try {
        const getAllProducts= await modeloProducto.find()
        res.status(200).json({mensaje:"Productos encontrados:",getAllProducts})
    } catch (error) {
        res.status(500).json({mensaje:"No se encontraron productos",error})
    }
}


const getProductOne= async (req,res)=>{
    try {
        const getAllProductsOne= await modeloProducto.findOne({_id:req.params.id})
        res.status(200).json({mensaje:"Producto encontrado:",getAllProductsOne})
    } catch (error) {
        res.status(500).json({mensaje:"No se encontraron productos",error})
    }
}



const postProducts= async (req,res)=>{
   try {
    const{Nombre,Precio,Marca,Descripcion}=req.body
    if(!Nombre || !Precio || !Marca || !Descripcion) {
        res.status(500).json({mensaje:"Algun campo se encuentra vacio"})
        return
    }
      const err=validationResult(req)
       if (!err.isEmpty()) {
            return res.status(422).json({mensaje:err.array()})
        }
        const searchName= await modeloProducto.findOne({Nombre})
        if (searchName) {
            res.status(500).json({mensaje:"Producto ya existe en la base de datos"})
           }else{
            const imageResult= await cloudinary.uploader.upload(req.file.path)
            const newRockProduct= new modeloProducto({
            ...req.body,
            Imagen:imageResult.secure_url
            })
            await newRockProduct.save()
             res.status(200).json({mensaje:"Producto creado correctamente",newRockProduct})
           }
        }
    catch (error) {
        res.status(500).json({mensaje:"ERROR"})
   }
}

const putProducts= async(req,res)=>{
    try {
        const updateProduct= await modeloProducto.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json({mensaje:'Producto actualizado correctamente',updateProduct})
    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
    }
}


const deleteProduct= async (req,res)=>{
    try {
        await modeloProducto.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({mensaje:'Producto eliminado correctamente',deleteProduct})
    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
    }
}


module.exports={
    getProducts,
    getProductOne,
    postProducts,
    putProducts,
    deleteProduct
}