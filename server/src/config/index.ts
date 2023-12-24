import express from "express";
import cors from "cors";

// const cookieParser = require("cook")


const FRONTEND_URL =  "http://localhost:3000";

export default function configureApp(app: express.Application){
    app.set("trust proxy", 1);

    app.use(
        cors({
            origin: [FRONTEND_URL]
        })
    );

    // app.use(logger("dev"))

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    // app.use(cookieParser());

}