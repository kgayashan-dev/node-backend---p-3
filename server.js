var express = require("express");
var app = express();
var db = require("./database");
var bodyParser = require("body-parser");
const { request, response } = require("express");
const cors = require("cors");
app.use(cors({ origin: "*" }));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080;

// Start server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

// Validation functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(cardNumber) {
  return /^\d{12}$/.test(cardNumber); // Luhn's algorithm would be more accurate here
}

// Register customer API
app.post("/api/customers", async (req, res) => { 
  try {
    const {
      name,
      address,
      email,
      dateOfBirth,
      gender,
      age,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      timeStamp,
    } = req.body;

    // Validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!isValidCardNumber(cardNumber)) {
      return res.status(400).json({ error: "Card number must be 12 digits" });
    }

    // Insert customer to the database
    const sql = `
      INSERT INTO customer (
        name, address, email, dateOfBirth, gender, age,
        cardHolderName, cardNumber, expiryDate, cvv, timeStamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      address,
      email,
      dateOfBirth,
      gender,
      age,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      timeStamp,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to register customer" });
      }
      res.status(201).json({
        customerId: this.lastID,
        message: `customer ${cardHolderName} has registered`,
      });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get all customers API
app.get("/api/customers", async (req, res) => {
  try {
    const sql = "SELECT * FROM customer";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch customers" });
      }
      res.status(200).json({ message: "success", data: rows });
    });
  } catch (e) {
    res.status(400).json({ error: "Unexpected error occurred" });
  }
});
