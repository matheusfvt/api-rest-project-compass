import express from "express";
import user from "./userRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ projeto: "Projeto Compass API REST FULL / Express e MangoDB" });
  });

  app.use(express.json(), user);
};

export default routes;
