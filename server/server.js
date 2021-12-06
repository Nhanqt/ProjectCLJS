const express = require("express");
const cors = require("cors");
const express_urgent = require("express-useragent");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const next = require("next");

const app = express();
const server = require("http").Server(app);

// Gọi các route
// const Util = require("./util/database");
const indexRoute = require("./routes/index");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));
app.set("trust proxy", true);
app.use(express_urgent.express());
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);
app.use(cookieParser());
app.use(
  morgan(function (tokens, req, res) {
    return [
      //   date,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use("/api", indexRoute);
app.all("*", (req, res) => {
  return nextHandler(req, res);
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
