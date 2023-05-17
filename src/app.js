const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const { checkConnection } = require("./database/prisma");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes"));
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    await checkConnection();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();
