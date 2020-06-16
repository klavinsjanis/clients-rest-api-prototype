const express = require('express');
const router = express.Router();
const Client = require('../models/client');

// Getting all, returns an array with all active clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find({ status: 'active' });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creates a single client
router.post('/', async (req, res) => {
  const client = new Client({
    name: req.body.name,
    status: req.body.status,
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Soft deleting a single client, target by id
router.delete('/:id', getClient, async (req, res) => {
  try {
    res.client.status = 'revoked';
    await res.client.delete(function () {});
    res.json({ message: 'Deleted Client' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Cannot find client' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.client = client;
  next();
}

module.exports = router;
