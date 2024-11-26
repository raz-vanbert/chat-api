import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";

async function createChatServer(options = {}) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}

export default createChatServer;
