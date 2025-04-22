const mysql = require("mysql2/promise");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "notes",
    port: 3307
});

// Create a note
async function createNote(name, value) {
    try {
        const conn = await connection;
        const [result] = await conn.execute(
            "INSERT INTO notes (name, value) VALUES (?, ?)", [name, value]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

// Read all notes
async function getAllNotes() {
    try {
        const conn = await connection;
        const [rows] = await conn.execute("SELECT * FROM notes");
        return rows;
    } catch (error) {
        console.error("Error getting notes:", error);
        throw error;
    }
}

// Read note by ID
async function getNoteById(id) {
    try {
        const conn = await connection;
        const [rows] = await conn.execute(
            "SELECT * FROM notes WHERE id = ?", [id]
        );
        return rows[0];
    } catch (error) {
        console.error("Error getting note:", error);
        throw error;
    }
}

// Update note
async function updateNote(id, name, value) {
    try {
        const conn = await connection;
        const [result] = await conn.execute(
            "UPDATE notes SET name = ?, value = ? WHERE id = ?", [name, value, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
}

// Delete note
async function deleteNote(id) {
    try {
        const conn = await connection;
        const [result] = await conn.execute(
            "DELETE FROM notes WHERE id = ?", [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
}

// Date-based operations
async function getNotesByDateRange(startDate, endDate) {
    try {
        const conn = await connection;
        const [rows] = await conn.execute(
            "SELECT * FROM notes WHERE created_at BETWEEN ? AND ?", [startDate, endDate]
        );
        return rows;
    } catch (error) {
        console.error("Error getting notes by date range:", error);
        throw error;
    }
}

async function getNotesFromToday() {
    try {
        const conn = await connection;
        const [rows] = await conn.execute(
            "SELECT * FROM notes WHERE DATE(created_at) = CURDATE()"
        );
        return rows;
    } catch (error) {
        console.error("Error getting today's notes:", error);
        throw error;
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getNotesByDateRange,
    getNotesFromToday
};