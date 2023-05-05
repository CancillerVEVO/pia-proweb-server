const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.handler");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();
