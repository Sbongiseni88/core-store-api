import Database from "better-sqlite3";
import path from 'path';

//resolve path where local database will be stored
const dbPath = path.resolve('core_store.db'); //pinpoints it to the root of our project

//open connection, if core_store.db doesnt exist SQLite creates it instantly
const db = new Database(dbPath, {
    verbose: console.log // logs every raw sql query to terminal so we can audit performance

});
// set up runtime configs via PRAGMA
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

console.log(`SQLite core engine linked securely to: ${dbPath}`);

//run shcema ddl setup.....using IF NOT EXISTS to ensure our data is safe on restarts.
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    store_branch TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS product_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    supplier_id INTEGER,
    price REAL NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
  );
`)

//export active connection object to be queried by our controller layer
export default db