const express=require('express');
const morgan=require("morgan")

class Servidor{
    constructor(){
        this.aplicacion=express();
        this.middlewars();
        this.rutas();
    }

    middlewars(){
        this.aplicacion.use(express.json());
        this.aplicacion.use(morgan('dev'));
    }

    rutas(){
        this.aplicacion.use('/productos',require('../rutas/productos.rutas'));
        this.aplicacion.use('/usuarios',require('../rutas/usuarios.rutas'));
    }

    listen(){
        this.aplicacion.listen(3001,()=>{
            console.log('Servidor conectado al puerto '+ 3001);
        })
    }

}

module.exports=Servidor