const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes"));
app.use(errorHandler);

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
