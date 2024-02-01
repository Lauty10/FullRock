const express=require("express")
const cors=require("cors")
const {MercadoPagoConfig}=require("mercadopago")
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

const app=express
const port=3001

app.use(cors());
app.use(express.json())


app.post("/create_preference" , async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }

})