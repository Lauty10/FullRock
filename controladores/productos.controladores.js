const modeloProducto=require("../modelos/productoSchema")


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



const postProducts=(req,res)=>{
    try {
        const {Nombre,Precio,Descripcion,Marca}=req.body
        if (!Nombre||!Precio||!Descripcion||!Marca) {
            res.status(500).json({mensaje:"Algun campo se encuentra vacio"})
            return
        }else{
            const newProduct= new modeloProducto(req.body)
            newProduct.save()
            res.status(201).json({mensaje:"El producto se creo correctamente",newProduct})
        }

    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
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
        const deleteProduct= await modeloProducto.findByIdAndDelete({_id:req.params.id})
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