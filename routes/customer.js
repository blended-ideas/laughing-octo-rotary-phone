const express = require('express');
const Customer = require('../models/customer.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const CustomerList = await Customer.find()
    .sort({ name: 1 });
  res.send(CustomerList);
});

router.post('/', async (req, res) => {
  const { body } = req;
  let customer = new Customer(body);
  try {
    customer = await customer.save();
  } catch (e) {
    res
      .status(400)
      .send(e);
    return;
  }

  res.status(201);
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let customer;
  try {
    customer = await Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!customer) {
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

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findByIdAndRemove(id);
  if (!customer) {
    res
      .status(404)
      .send('The ID does not exist');
    return;
  }

  res.status(204);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findById(id);
  if (!customer) {
    res
      .status(404)
      .send('The ID does not exist');
    return;
  }

  res.send(customer);
});

module.exports = router;
