const modeloProducto=require("../modelos/productoSchema")


const getProducts= async(req,res)=>{
    try {
        const getAllProducts= await modeloProducto.find()
        res.status(200).json({mensaje:"Productos encontrados:",getAllProducts})
    } catch (error) {
        res.status(400).json({mensaje:"No se encontraron productos",error})
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

module.exports={
    getProducts,
    postProducts
}