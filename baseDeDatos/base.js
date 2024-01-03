const mongoose=require("mongoose")
mongoose.connect(process.env.MONGOOSE_CONNECT)
.then(()=>console.log("Base conectada con exito"))
.catch((err)=>console.log("Error al conectar la base de datos",err))