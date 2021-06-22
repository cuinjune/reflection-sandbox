const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

// set static server
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// listening port
app.listen(PORT, () => {
  console.log(`Server is running localhost on port: ${PORT}`);
});