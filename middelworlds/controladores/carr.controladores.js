const carrModel = require("../modelos/carrSchema");
const modeloProducto = require("../modelos/productoSchema");
const {MercadoPagoConfig,Preference}=require("mercadopago")
const client = new MercadoPagoConfig({ accessToken: `${process.env.ACCESS_TOKEN}` });

const carrProduct=async(req,res)=>{
    try {
        const carrGet= await carrModel.find()
        res.status(200).json({mensaje:"carritos encontrados:",carrGet})

    } catch (error) {
        console.log(error);
    }
}

const deleteCarr=async(req,res)=>{
    try {
        const  carrProd= await carrModel.findOne({_id:req.idCarr});
        const productCarr= await modeloProducto.findOne({_id:req.params.idProductCarr})

        const deleteNFav=carrProd.productos.filter((data)=>data._id.toString()!==productCarr._id.toString())

        const deleteAFav=carrProd.productos.filter((data)=>data._id.toString()===productCarr._id.toString())

        if (!deleteAFav.length) {
            return res.status(400).json({mensaje:"Id incorrecto"})
        }

         carrProd.productos=deleteNFav
         await carrProd.save()
         res.status(200).json({mensaje:"eliminado del carrito:"})

    } catch (error) {
        console.log(error);
    }
}

const CarPay=async(req,res)=>{
    try {
        const {title,price,quantity}=req.body
        const body = {
            items: [
              {
                title: title,   
                quantity: quantity,
                unit_price: price,
                currency_id: "ARS",
              },
            ],
            back_urls: {
              success: `${process.env.URL_FRONT}`,
              failure: `${process.env.URL_FRONT}`,
              pending: `${process.env.URL_FRONT}`,
            },
            auto_return: "approved",
          }; 

        const preference = new Preference(client);
        const result = await preference.create({ body }); 
        console.log(result.init_point);
        res.status(200).json({res:result.init_point})
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    carrProduct,
    deleteCarr,
    CarPay
}