const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://lautylbs:c29M2EMbYrca1wxD@cluster0.lglvk8j.mongodb.net/")
.then(()=>console.log("Base conectada con exito"))
.catch((err)=>console.log("Error al conectar la base de datos",err))