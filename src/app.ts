// require("dotenv");
import dotenv, { config } from 'dotenv'
dotenv.config();

import express from 'express';
import configureApp from './config'

import indexRoutes from "./routes/index";

//Connects to our db
require("./db");

// const express = require("express");

const app = express();
configureApp(app)

// Add routes!
app.use("/api", indexRoutes);

export default app