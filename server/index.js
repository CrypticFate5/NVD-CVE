import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import cvesRoute from "./routes/cvesRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// const job=cron.schedule("0 30 01 * * *",apiPullData);
// apiPullData();

app.use("/cves", cvesRoute);

const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on ${PORT}`);
    })
}).catch((error) => {
    console.log(`Did not connect \n ${error}`);
})
