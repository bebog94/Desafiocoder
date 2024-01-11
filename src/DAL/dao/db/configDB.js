import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));



