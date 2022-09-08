import mongoose from "mongoose";

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexOnlyNumber = /^[0-9]/;

function calculateAge(dataInput) {
  var birthDate = new Date(dataInput);

  var difference = Date.now() - birthDate.getTime();

  var ageDate = new Date(difference);
  var actualAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (actualAge >= 18) {
    return true;
  } else {
    return false;
  }
}

const userSchema = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    cpf: { type: String, validate: regexOnlyNumber, minLength: 11, maxLength: 11, required: true },
    birthDate: {
      type: String,
      validate: {
        validator: calculateAge,
        message: "Needs to be over 18 years old!",
      },
      required: true,
    },
    email: { type: String, validate: regexEmail, required: true },
    password: { type: String, minLength: 6, required: true },
    adress: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, minLength: 8 , maxLength: 8 ,validate: regexOnlyNumber, required: true },
  },
  {
    versionKey: false,
  }
);

const user = mongoose.model("user", userSchema);

export default user;
