const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware.js');
const UserModel = require('../models/userModel.js');

const router = express.Router();

router.post('/submit-score', asyncMiddleware( async (req, res, next) => {
    const { username, score } = req.body;
    await UserModel.updateOne({ username }, { highScore: score });
    res.status(200).json({ 'status': 'ok' });
}));

router.get('/scores', asyncMiddleware( async (req, res, next) => {
    const users = await UserModel.find({}, {"_id": 0, "username": 1, "highScore": 1}).sort({ highScore: -1 }).limit(10);
    res.status(200).json(users);
}));

module.exports = router;