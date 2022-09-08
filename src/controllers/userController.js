import user from "../models/User.js";

class UserController {
  static listarUsers = (req, res) => {
    user.find((err, user) => {
      res.status(200).json(user);
    });
  };

  static listarUserPorId = (req, res) => {
    const id = req.params.id;

    user.findById(id, (err, user) => {
      if (err) {
        res.status(400).send({ message: `${err.message} // ID do User nao localizado` });
      } else {
        res.status(200).send(user);
      }
    });
  };

  static listarUsersPorNome = (req, res) => {
    const name = req.query.name;

    user.find({ name: { $regex: name, $options: "i" } }, {}, (err, user) => {
        res.status(200).send(user);
    });
  };
  
  static cadastrarUser = (req, res) => {
    let userNew = new user(req.body);

    userNew.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} // Falha ao cadastrar o usuario` });
      } else {
        res.status(201).send(userNew.toJSON());
      }
    });
  };

  static atualizarUser = (req, res) => {
    const id = req.params.id;

    user.findByIdAndUpdate(id, { $set: req.body }, {runValidators: true},  (err) => {
      if (!err) {
        res.status(200).send({ message: "Usuario atualizado com sucesso!" });
      } else {
        res.status(500).send({ message: `${err.message} // Nao foi possivel atualizar o Usuario` });
      }
    });
  };

  static excluirUser = (req, res) => {
    const id = req.params.id;

    user.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Usuario removido com sucesso!" });
      } else {
        res.status(500).send({ message: `${err.message} // Nao foi possivel excluir o Usuario por esse ID` });
      }
    });
  };
}

export default UserController;
