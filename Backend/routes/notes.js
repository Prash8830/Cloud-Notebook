const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1 : Fetch All Notes using = "api/notes/fetchallnotes" using get

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error occured");
    }
})


// Route 2 : add Notes using = "api/notes/addnotes" using post

router.post('/addnotes', fetchuser, [
    body('title', ' enter a valid title ').isLength({ min: 3 }),
    body('description', ' enter a valid description ').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //if there are errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error occured");
    }
})

module.exports = router