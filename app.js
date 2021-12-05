const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");


const createError = require("http-errors");

//instancia routes
const itemsRouter = require("./routes/items");
const itemDetailRouter = require("./routes/item-detail");

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

//rutas
app.use("/items", itemsRouter);
app.use("/item-detail", itemDetailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
