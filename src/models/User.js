import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  cpf: { 
    type: String, 
    validate: /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/,
    required: true },
  birthDate: { type: Date, required: true },
  email: { 
    type: String, 
    validate:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true },
  password: { type: String, minLength: 6, required: true },
  adress: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
},
{
  versionKey: false
});

const user = mongoose.model("user", userSchema);

export default user;
