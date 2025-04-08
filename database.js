var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database...");

    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT, 
        description TEXT,
        category TEXT, 
        brand TEXT,
        expiredDate TEXT, 
        manufacturedDate TEXT, 
        batchNumber INTEGER, 
        unitPrice INTEGER,
        quantity INTEGER, 
        createdDate TEXT)`,
      (err) => {
        if (err) {
        //   console.log("Table already exists or error during table creation.");
        } else {
          console.log("Table created or already exists.");
          var insert = `INSERT INTO products(
            productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) 
            VALUES(?,?,?,?,?,?,?,?,?,?)`;

          db.run(insert, [
            'White rice', 
            'white rice imported from SL', 
            'Rice', 
            'CIC', 
            '2025-08-09',
            '2025-03-09', 
            5, 
            200, 
            4, 
            '2025-04-09'
          ], function(err) {
            if (err) {
              console.log("Error inserting data: ", err.message);
            } else {
              console.log(`Row(s) inserted with ID: ${this.lastID}`);
            }
          });
        }
      }
    );
  }
});
module.exports = db;