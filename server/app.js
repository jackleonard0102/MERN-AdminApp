const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const http = require("http");
const dayjs = require("dayjs");
const morgan = require("morgan");
const { scheduleJob } = require("node-schedule");
const chalk = require('chalk');

const config = require("./config");
const socketIO = require("./socket");
const webhook = require("./controllers/webhook");
const api = require("./routes");
const UserModel = require("./models/userModel");
const { _log, _error } = require("./utils/logging");

// const sharp = require("sharp");
// const request = require('request');

mongoose
  .connect(config.MongoURL)
  .then(async () => {
    await UserModel.updateMany({}, { $set: { socketId: [] } });
    _log("MONGODB connected!");
  })
  .catch(_error);

const app = express();

const server = http.createServer(app);

socketIO.init(server);

app.set("io", socketIO.getSocketIO());

app.set("view engine", "ejs");

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  webhook.index
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());

app.use(express.static(`${__dirname}/public`));

/**
  app.use("/image/:token/:filename", (req, res) => {
    const { token, filename } = req.params;
    const { w, h } = req.query;
    const url = `https://cl.imagineapi.dev/assets/${token}/${filename}`;
    if (w && h) {
      request({ url, encoding: null }, (err, response, body) => {
        if (err || res.statusCode !== 200) {
          _log("Error:", err || res.statusCode);
          return;
        }

        sharp(body)
          .resize(Number(w), Number(h))
          .toBuffer()
          .then((data) => {
            res.writeHead(200, {
              "Content-Type": "image/jpeg",
              "Content-Length": data.length,
            });
            res.end(data);
          })
          .catch((err) => {
            _error(err);
            res.status(500).send("Internal Server Error");
          });
      });
    } else {
      req.pipe(request(url)).pipe(res);
    }
  });
*/

app.use("/api", api);

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  _log(`Server is running on port`, PORT);
});

const job = scheduleJob("* * * * *", () => {
  _log("Running", dayjs().format("YYYY-MM-DD HH:mm:ss"));
});

//   while (true) {
//     const projects = await ConceptModel.find({
//       "resultImages.status": { $in: ["pending", "processing"] }
//     }).sort("createdAt");
//     _log("running", projects.length, dayjs().format('YYYY-MM-DD HH:mm:ss'));
//     // _log(projects);
//     for (const [index, project] of projects.entries()) {
//       for (const resultImage of project.resultImages) {
//         try {
//           if (resultImage.status == "processing") {
//             if (resultImage.prompt) {
//               let data = await _generateImage(resultImage.prompt);
//               await ConceptModel.updateOne(
//                 {
//                   _id: project._id,
//                   'resultImages.imageId': resultImage.imageId
//                 },
//                 {
//                   $set: {
//                     'resultImages.$.imageId': data.id,
//                     'resultImages.$.status': data.status,
//                   }
//                 }, { new: true });
//             } else {
//               // let data = await getPromptByKeywords
//             }
//           } else if (resultImage.status !== "completed" && resultImage.status !== "failed") {
//             let data = await getImages(resultImage.imageId);
//             if (data.status != "completed" && data.status != "failed") {
//               socketIO.getSocketIO().to(project.userId.toString()).emit("IMAGE_PROCESS", {
//                 progress: data.progress,
//                 status: data.status.replace('pending', 'uploading').replace('in-progress', 'generating'),
//                 id: data.id,
//                 url: data.url,
//                 count: index,
//               });
//             } else {
//               _log("finished", project.userId, project._id);
//               await ConceptModel.updateOne(
//                 {
//                   _id: project._id,
//                   'resultImages.imageId': resultImage.imageId
//                 },
//                 {
//                   $set: {
//                     'resultImages.$.urls': data.upscaled_urls,
//                     'resultImages.$.status': data.status,
//                   }
//                 }, { new: true });

//               socketIO.getSocketIO().to(project.userId.toString()).emit('IMAGE_GENERATED', {
//                 success: true,
//                 count: index,
//               });
//             }
//           }
//         } catch (error) {
//           _error("app.js:168", error);
//         }
//       }
//     }

//     await sleep(1);
//   }
// };
