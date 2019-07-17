const express = require("express");

const db = require("../dbconfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const note = req.body;

  db("notes")
    .insert(note)
    .then(ids => {
      const id = ids[0];

      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
