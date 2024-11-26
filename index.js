const express = require('express');
const chatApi = require('./src/api');

function createChatServer(options = {}) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Initialize chat API routes
  chatApi(app);

  return app;
}

module.exports = createChatServer;