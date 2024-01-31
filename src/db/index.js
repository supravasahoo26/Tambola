const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

async function initDatabase() {
    db = await open({
        filename: '../tambola.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            set_number INTEGER,
            ticket_number INTEGER,
            numbers TEXT
        )
    `);
}

function getDatabaseInstance() {
    if (!db) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return db;
}

module.exports = { initDatabase, getDatabaseInstance };
