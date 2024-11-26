import express from "express";

const rooms = {}; // In-memory storage for rooms and messages

function chatApi(app) {
  const router = express.Router();

  // Create a new chat room
  router.post("/rooms", (req, res) => {
    const { roomName } = req.body;
    if (!roomName) {
      return res.status(400).json({ error: "Room name is required" });
    }
    if (rooms[roomName]) {
      return res.status(409).json({ error: "Room already exists" });
    }
    rooms[roomName] = [];
    res.status(201).json({ message: `Room '${roomName}' created` });
  });

  // Get messages from a chat room
  router.get("/rooms/:roomName/messages", (req, res) => {
    const { roomName } = req.params;
    if (!rooms[roomName]) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(rooms[roomName]);
  });

  // Post a message to a chat room
  router.post("/rooms/:roomName/messages", (req, res) => {
    const { roomName } = req.params;
    const { username, message } = req.body;
    if (!rooms[roomName]) {
      return res.status(404).json({ error: "Room not found" });
    }
    if (!username || !message) {
      return res
        .status(400)
        .json({ error: "Username and message are required" });
    }
    const msg = {
      username,
      message,
      timestamp: new Date().toISOString(),
    };
    rooms[roomName].push(msg);
    res.status(201).json(msg);
  });

  app.use("/api", router);
}

export default chatApi;
