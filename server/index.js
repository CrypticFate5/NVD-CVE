import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());

const PORT=process.env.PORT||6000;
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Running on ${PORT}`);
    })
}).catch((error)=>{
    console.log(`Did not connect \n ${error}`);
})