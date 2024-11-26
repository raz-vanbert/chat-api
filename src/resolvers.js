const rooms = {}; // In-memory storage for rooms and messages

export const resolvers = {
  Query: {
    getRooms: () => {
      return Object.keys(rooms).map((roomName) => ({
        roomName,
        messages: rooms[roomName],
      }));
    },
    getMessages: (_, { roomName }) => {
      if (!rooms[roomName]) {
        throw new Error("Room not found");
      }
      return rooms[roomName];
    },
  },
  Mutation: {
    createRoom: (_, { roomName }) => {
      if (!roomName) {
        throw new Error("Room name is required");
      }
      if (rooms[roomName]) {
        throw new Error("Room already exists");
      }
      rooms[roomName] = [];
      return {
        roomName,
        messages: rooms[roomName],
      };
    },
    postMessage: (_, { roomName, username, message }) => {
      if (!rooms[roomName]) {
        throw new Error("Room not found");
      }
      if (!username || !message) {
        throw new Error("Username and message are required");
      }
      const msg = {
        username,
        message,
        timestamp: new Date().toISOString(),
      };
      rooms[roomName].push(msg);
      return msg;
    },
  },
};
