const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    
    res.json(["Hi these are my notes"])
} )

module.exports = router