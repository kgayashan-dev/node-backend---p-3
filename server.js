var express = require("express");
var db = require("./database");
const app = express(); // Declare app once

// Use express.json() to parse incoming JSON bodies
app.use(express.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log(
    "Server is running on http://localhost:%PORT%".replace("%PORT%", HTTP_PORT)
  );
});

app.get("/", (req, res) => {
  res.send("Hello from Express + SQLite!");
});

// POST route to add a new product
app.post("/api/products", (req, res) => {
  try {
    var errors = [];
    if (!req.body) {
      errors.push("An invalid input.");
    }

    const {
      productName,
      description,
      category,
      brand,
      expireDate,
      manufactureDate,
      batchNumber,
      unitPrice,
      quantity,
      createdDate,
    } = req.body;

    var sql = `INSERT INTO products(
      productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) 
      VALUES(?,?,?,?,?,?,?,?,?,?)`;

    var params = [
      productName,
      description,
      category,
      brand,
      expireDate,
      manufactureDate,
      batchNumber,
      unitPrice,
      quantity,
      createdDate,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        res.json({ message: "success", id: this.lastID });
      }
    });
  } catch (E) {
    res.status(400).send(E);
  }
});

// GET route to fetch products
app.get("/api/products", (req, res) => {
  try {
    var sql = "SELECT * FROM products";
    var params = [];

    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(200).json({ message: "success", data: rows });
    });
  } catch (E) {
    res.status(400).send(E);
  }
});

// PUT route to update a product
app.put("/api/products/", (req, res) => {
  const {
    id,
    productName,
    description,
    category,
    brand,
    expireDate,
    manufactureDate,
    batchNumber,
    unitPrice,
    quantity,
    createdDate,
  } = req.body;

  const sql = `
    UPDATE products SET 
      productName=?, 
      description=?, 
      category=?, 
      brand=?, 
      expiredDate=?, 
      manufacturedDate=?, 
      batchNumber=?, 
      unitPrice=?, 
      quantity=?, 
      createdDate=?
    WHERE id=?
  `;

  const params = [
    productName,
    description,
    category,
    brand,
    expireDate,
    manufactureDate,
    batchNumber,
    unitPrice,
    quantity,
    createdDate,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.status(200).json({
      message: `Product updated ${this.lastID}`,

      updatedRows: this.changes,
    });
  });
});

app.delete("/api/products/delete/:id/", (req, res, next) => {
  try {
    db.run(
      "DELETE FROM products WHERE id = ?",
      req.params.id,
      function (err, result) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(200).json({
          message: `Product is deleted`,
          rows: this.changes,
        });
      }
    );
  } catch (E) {
    res.status(400).send(E);
  }
});
