// require("dotenv");
import dotenv, { config } from 'dotenv'
dotenv.config();

import express from 'express';
import configureApp from './config'

import indexRoutes from "./routes/index.routes";
import entryRoutes from "./routes/entires.routes"
import authRoutes from "./routes/auth.routes";

//Connects to our db
require("./db");

// const express = require("express");

const app = express();
configureApp(app)

// Add routes!
app.use("/api", indexRoutes);
app.use("/api", entryRoutes);
app.use("/api", authRoutes);

export default app