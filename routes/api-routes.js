const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const notesData = require('../db/db.json');

module.exports = (app) => {
  // API route to get all notes
  app.get('/notes', (req, res) => {
    res.json(notesData);
  });

  // API route to save a new note
  app.post('/api/notes', (req, res) => {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    notesData.push(newNote);
    saveNotesData();

    res.json(newNote);
  });

  // API route to delete a note by ID
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    // Find the note with the given ID
    const noteIndex = notesData.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
      // Remove the note from the array
      notesData.splice(noteIndex, 1);
      saveNotesData();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  // Function to save the notes data to the JSON file
  function saveNotesData() {
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(notesData, null, 2)
    );
  }
};