const connectToMongo = require("./database");
const express = require("express");
const cors = require("cors");
connectToMongo();
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));

app.listen(port, () => {
  console.log(`Taaza-Khabar listening on port ${port}`);
});
