const connectToMongo = require("./database");
const express = require("express");
connectToMongo();

const app = express();
app.use(express.json());
const port = 5000;
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
