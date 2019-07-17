const express = require("express");

const db = require("../dbconfig");

const router = express.Router();

router.post("/", (req, res) => {
  const note = req.body;

  if (!note.title) {
    return res.status(400).json({ message: "must include title" });
  }

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

router.get("/", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", validateId, (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .then(note => {
      res.status(200).json(note[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .delete()
    .then(deleted => {
      res.status(200).json({ message: `note with id ${id} was deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", validateId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("notes")
    .where({ id })
    .update(changes)
    .then(updated => {
      res.status(200).json({ message: "note updated" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//CUSTOM MIDDLEWARE

function validateId(req, res, next) {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .then(response => {
      if (response.length) {
        next();
      } else {
        res.status(400).json({ message: "invalid note id" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = router;
