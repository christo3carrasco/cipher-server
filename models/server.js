const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      option: "/api/option",
      user: "/api/user",
      vote: "/api/vote",
      voter: "/api/voter",
      voting: "/api/voting",
    };

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.option, require("../routes/option"));
    this.app.use(this.paths.user, require("../routes/user"));
    this.app.use(this.paths.vote, require("../routes/vote"));
    this.app.use(this.paths.voter, require("../routes/voter"));
    this.app.use(this.paths.voting, require("../routes/voting"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("web server listening on port", this.port);
    });
  }
}

module.exports = Server;
