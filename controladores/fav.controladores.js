const favModel = require("../modelos/favSchema");
const modeloProducto = require("../modelos/productoSchema");

const getFav=async(req,res)=>{
    try {
        const getAllFav= await favModel.find()
        res.status(200).json({mensaje:"favoritos encontrados:",getAllFav})
    } catch (error) {
        console.log(error);
    }
}

const deletefav = async (req, res) => {
    try {
        const favProd = await favModel.findOne({ _id: req.idFav });
        const productFav = await modeloProducto.findOne({ _id: req.params.idProduct });

        const deleteAFav = favProd.favoritos.find((data) => data._id.toString() === productFav._id.toString());
        if (!deleteAFav) {
            return res.status(400).json({ mensaje: "El producto no está en la lista de favoritos" });
        }

        const deleteNFav = favProd.favoritos.filter((data) => data._id.toString() !== productFav._id.toString());

        favProd.favoritos = deleteNFav;
        await favProd.save();
        res.status(200).json({ mensaje: "Favorito eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar favorito:', error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


module.exports={
    getFav,
    deletefav
}