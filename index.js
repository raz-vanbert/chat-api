import cors from "cors";
import express from "express";
import * as chatApi from "./src/api.js";

function createChatServer(options = {}) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Initialize chat API routes
  chatApi(app);

  return app;
}

export default createChatServer;
