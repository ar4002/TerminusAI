import express from 'express' 
import dotenv from 'dotenv'
import mongoose from 'mongoose' 
import userRoute from './routes/user.route.js'      
import cookieParser from 'cookie-parser';
import promtRoute from './routes/promt.route.js'
import cors from "cors"
dotenv.config()
const app = express()
const port = process.env.PORT ||4001;

const MONGO_URL=process.env.MONGO_URI;

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type", "Authorization"],
})
);
app.use(express.json()); 
app.use(cookieParser());
mongoose.connect(MONGO_URL).then(()=>console.log("Connected to MONGO DB")).catch((error)=>console.error("MONGO DB connection error",error))

app.use("/api/v1/user",userRoute); 
app.use("/api/v1/deepseekai",promtRoute); 
        
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})




