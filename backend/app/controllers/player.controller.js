const db = require("../models");
const Player = db.players;

// Create and Save a new Player Data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Player_Name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  };

  // Create a new Player Data
  const player = new Player({
    player_name: req.body.player_name,
    matches: req.body.matches,
    inns: req.body.inns,
    runs: req.body.runs,
    hs: req.body.hs,
    ave: req.body.ave,
    added: req.body.added ? req.body.added : false
  });

  // Save Player Data in the database
  player
    .save(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Program failed to create record for this player."
      });
    });
};

// Retrieve all Player Data from the database.
exports.findAll = (req, res) => {
  const player_name = req.query.player_name;
  var condition = player_name ? { player_name: { $regex: new RegExp(player_name), $options: "i" } } : {};

  Player.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving player list."
      });
    });

};

// Find a single Player with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Player.findById({id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Player with id " + id });
      else res.send(Player);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Player with id=" + id });
    });
};

// Update a Player by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please enter some data in the field!"
    });
  }

  const id = req.params.id;

  Player.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Player with id=${id}. Maybe Player was not found!`
        });
      } else res.send({ message: "Player data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Player with id=" + id
      });
    });
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Player.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
        });
      } else {
        res.send({
          message: "Player data has been deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Player with id=" + id
      });
    });
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
  Player.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Players were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all players."
      });
    });
};

// Find all added Players
exports.findAllAdded = (req, res) => {
  Player.find({ added: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};

