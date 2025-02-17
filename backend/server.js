import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import novenyRoute from './routes/noveny.js'
import {DbInit} from './database.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json);
app.use(cors());
app.use("/api", novenyRoute);

const startServer = async () =>{
    try{
        await DbInit();
        app.listen(PORT, () =>{
            console.log(`A szerver fut a https://localhost${PORT} címen.`);
        });
    } catch (err)
    {
        console.log(err);
        console.log("Hiba a szerver indításnál.");
    }
}

startServer();