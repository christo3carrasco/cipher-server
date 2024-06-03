const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      option: "/api/option",
      vote: "/api/vote",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.option, require("../routes/option"));
    this.app.use(this.paths.vote, require("../routes/vote"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("web server listening on port", this.port);
    });
  }
}

module.exports = Server;
