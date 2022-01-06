const express = require('express');
const Genre = require('../models/genre.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const genreList = await Genre.find()
    .sort({ name: 1 });
  res.send(genreList);
});

router.post('/', async (req, res) => {
  const { body } = req;
  let genre = new Genre(body);
  try {
    genre = await genre.save();
  } catch (e) {
    res
      .status(400)
      .send(e);
    return;
  }

  res.status(201);
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let genre;
  try {
    genre = await Genre.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!genre) {
      res
        .status(404)
        .send('The ID does not exist');
      return;
    }
  } catch (e) {
    res
      .status(400)
      .send(e);
    return;
  }

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findByIdAndRemove(id);
  if (!genre) {
    res
      .status(404)
      .send('The ID does not exist');
    return;
  }

  res.status(204);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) {
    res
      .status(404)
      .send('The ID does not exist');
    return;
  }

  res.send(genre);
});

module.exports = router;
