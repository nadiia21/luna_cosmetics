const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('List of posts');
});

router.post('/', (req, res) => {
    const newPost = req.body;
    res.status(201).send(`Post created: ${JSON.stringify(newPost)}`);
});

module.exports = router;
