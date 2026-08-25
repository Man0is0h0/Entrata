const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite DB (file-based or in-memory for tests)
const dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : path.resolve(__dirname, 'todo.sqlite3');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log(`Connected to database at ${dbPath}`);
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

module.exports = db;
