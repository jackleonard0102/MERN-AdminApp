// app.js
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const http = require("http");
const morgan = require("morgan");
const { scheduleJob } = require("node-schedule");
const dayjs = require("dayjs");
const config = require("./config");
const socketIO = require("./socket");
const api = require("./routes");
const UserModel = require("./models/userModel");
const SettingModel = require("./models/settingModel");
const { _log, _error } = require("./utils/logging");
const seedAdmin = require("./models/seedAdmin");

mongoose
  .connect(config.MongoURL)
  .then(async () => {
    await UserModel.updateMany({}, { $set: { socketId: [] } });
    _log("MONGODB connected!");
    await seedAdmin(); // Seed the admin user
  })
  .catch(_error);

const app = express();
const server = http.createServer(app);
socketIO.init(server);
app.set("io", socketIO.getSocketIO());
app.set("view engine", "ejs");

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.use('/upload', express.static(path.join(__dirname, 'public/upload')));
app.use('/uploads', express.static('uploads'));

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  _log(`Server is running on port ${PORT}`);
});

const job = scheduleJob("* * * * *", () => {
  _log("Running", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});
