const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const itemRoutes = require("./routes/items");
// const middleware = require("./middleware");

app.use(express.json());
app.use("/items", itemRoutes);

/** 404 handler */

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});

module.exports = app;

// app.get("/items", function (req, res, next) {

// })

// app.post("/items", function (req, res, next) {

// })

// app.get("/items/:name", function (req, res, next) {

// })

// app.patch("/items/:name", function (req, res, next) {

// })

// app.delete("/items/:name", function (req, res, next) {

// })