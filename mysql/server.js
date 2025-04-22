const express = require("express");
const app = express();
const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getNotesByDateRange,
    getNotesFromToday
} = require("./database");

// Middleware to parse JSON bodies
app.use(express.json());

// Create a new note
app.post("/notes", async(req, res) => {
    try {
        const { name, value } = req.body;
        const id = await createNote(name, value);
        res.status(201).json({ id, message: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating note" });
    }
});

// Get all notes
app.get("/notes", async(req, res) => {
    try {
        const notes = await getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching notes" });
    }
});

// Get note by ID
app.get("/notes/:id", async(req, res) => {
    try {
        const note = await getNoteById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching note" });
    }
});

// Update note
app.put("/notes/:id", async(req, res) => {
    try {
        const { name, value } = req.body;
        const success = await updateNote(req.params.id, name, value);
        if (success) {
            res.json({ message: "Note updated successfully" });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating note" });
    }
});

// Delete note
app.delete("/notes/:id", async(req, res) => {
    try {
        const success = await deleteNote(req.params.id);
        if (success) {
            res.json({ message: "Note deleted successfully" });
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting note" });
    }
});

// Get notes by date range
app.get("/notes/date-range", async(req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const notes = await getNotesByDateRange(startDate, endDate);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching notes by date range" });
    }
});

// Get today's notes
app.get("/notes/today", async(req, res) => {
    try {
        const notes = await getNotesFromToday();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching today's notes" });
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});