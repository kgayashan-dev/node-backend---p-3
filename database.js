var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database...");

    db.run(
      `CREATE TABLE IF NOT EXISTS customer (
      customerId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      email TEXT NOT NULL,
      dateOfBirth TEXT,
      gender TEXT,
      age INTEGER,
      cardHolderName TEXT,
      cardNumber TEXT,
      expiryDate TEXT,
      cvv TEXT,
      timeStamp TEXT
    )`

      // (err) => {
      //   if (err) {
      //     //   console.log("Table already exists or error during table creation.");
      //   } else {
      //     console.log("Table created or already exists.");
      //     var insert = `INSERT INTO customer(
      //       name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv,timeStamp)
      //       VALUES(?,?,?,?,?,?,?,?,?,?,?)`;

      //     db.run(
      //       insert,
      //       [
      //         "Saman perera",
      //         "No 324/A Ra De Mel Road, Colombo",
      //         "samanp@gmail.com",
      //         "1993.02.25",
      //         "male",
      //         32,
      //         "A.D.L.Dharmasiri",
      //         "123345123234",
      //         "122022",
      //         "345",
      //         "2022-12-31 23:59:59",
      //       ],
      //       function (err) {
      //         if (err) {
      //           console.log("Error inserting data: ", err.message);
      //         } else {
      //           console.log(`Row(s) inserted with ID: ${this.lastID}`);
      //         }
      //       }
      //     );
      //   }
      // }
    );
  }
});
module.exports = db;
