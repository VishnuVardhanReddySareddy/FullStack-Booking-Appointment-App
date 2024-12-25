

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/users");
const db = require("./models");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "views")));


app.use("/users", userRoutes);


db.sequelize.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
