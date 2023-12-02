import imgRoutes from "./imgRoutes.js";
import userRoutes from "./userRoutes.js";
import express from 'express';

const rootRoutes = express.Router();
rootRoutes.use("/user", userRoutes)
rootRoutes.use("/img", imgRoutes);

export default rootRoutes;