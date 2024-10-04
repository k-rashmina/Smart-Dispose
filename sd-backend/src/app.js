const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./db-config");
const routes = require("./routes");
const monitorBinLevelService = require("./services/kalindu/monitorBinLevelService");
const MonthlyBillService = require("./services/yohan/monthlyBillService");

//initialization and middleware
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(cors(["http://localhost:5173/*"]));
app.use(express.json({ limit: "15mb" }));
//routes
app.use("/", routes);

//db connection

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  dbConnect();
  monitorBinLevelService();

  // Schedule monthly bill generation
  MonthlyBillService.scheduleMonthlyBillGeneration();
});
