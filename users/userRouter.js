const express = require("express");

const db = require("../dbconfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .then(user => {
      res.status(200).json(user[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .delete()
    .then(deleted => {
      console.log(deleted);
      res.status(200).json({ message: `user with id ${id} was deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password) {
    return res
      .status(400)
      .json({ message: "Must provide both username and password" });
  }

  db("users")
    .insert(user)
    .then(ids => {
      const id = ids[0];

      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//CUSTOM MIDDLEWARE

function validateId(req, res, next) {
  const { id } = req.params;

  db("users")
    .where({ id })
    .then(response => {
      if (response.length) {
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = router;
