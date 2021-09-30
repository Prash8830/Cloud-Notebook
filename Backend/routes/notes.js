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

//Route 3: Update existing notes "api/auth/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const{ title, description ,tag} = req.body;
    //create a new object
    const newnote = {};
    if(title){newnote.title = title};
    if(description){newnote.description = description};
    if(tag){newnote.tag = tag};
    //find note to be updated & update it
    let note =await Note.findByIdAndUpdate(req.params.id)
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString()!==req.user.id){return res.status(401).send("Not Authorized")}
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({note});
})
module.exports = router