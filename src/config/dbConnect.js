import mongoose from "mongoose";

mongoose.connect("mongodb+srv://matheus:123@compass.6zhsvcb.mongodb.net/projeto-compass");

let db = mongoose.connection;

export default db;