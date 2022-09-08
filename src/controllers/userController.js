import user from "../models/User.js";

class UserController {
  static listarUsers = (req, res) => {
    user.find((err, users) => {
      if(err){
        res.status(404).send({message: `${err.message} // Users not found`})
      } else{
        res.status(200).json(users);
      }
    }).select("-password");
  };

  static listarUsersPagination = (req, res) => {
    res.status(200).json(res.paginatedResults);
  };

  static listarUserPorId = (req, res) => {
    const {id} = req.params;

    user.findById(id, (err, user) => {
      if (err) {
        res.status(404).send({ message: `${err.message} // ID ${id} not found` });
      } else {
        res.status(200).send(user);
      }
    }).select('-password');
  };

  static listarUsersPorNome = (req, res) => {
    const {name} = req.query;

    user.find({ name: { $regex: name, $options: "i" } }, {}, (err, user) => {
      if(user.length == 0){
        res.status(404).send({message: `404 // User not found`})
      } else{
        res.status(200).send(user);
      }
    }).select('-password');
  };

  static cadastrarUser = (req, res) => {
    let userNew = new user(req.body);

    userNew.save((err) => {
      if (err) {
        res.status(400).send({ message: `${err.message} // Failed to register user` });
      } else {
        res.status(201).send(userNew.toJSON());
      }
    });
  };

  static atualizarUser = (req, res) => {
    const {id} = req.params

    user.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Usuario atualizado com sucesso!" });
      } else {
        if (err.name == "CastError") {
          res.status(404).send({ message: `${err.message} // User with ID ${id} not found!` });
        } else {
          res.status(400).send({ message: `${err.message} // Failed to update user` });
        }
      }
    });
  };

  static excluirUser = (req, res) => {
    const {id} = req.params

    user.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send();
      } else {
        if (err.name == "CastError") {
          res.status(404).send({ message: `${err.message} // User with ID ${id} not found!` });
        } else {
          res.status(500).send({ message: `${err.message} // Failed to delete user` });
        }
      }
    });
  };
}

export default UserController;
