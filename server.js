const express = require("express");
const cors = require("cors");
const app = express();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
// app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
