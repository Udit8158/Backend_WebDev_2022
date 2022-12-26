const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('Users page.');
})

router.get('/:id',(req,res) => {
    res.send(`User with id ${req.params.id} was found.`);
})

module.exports = router