import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Message {
    username: String!
    message: String!
    timestamp: String!
  }

  type Room {
    roomName: String!
    messages: [Message!]!
  }

  type Query {
    getRooms: [Room!]!
    getMessages(roomName: String!): [Message!]!
  }

  type Mutation {
    createRoom(roomName: String!): Room!
    postMessage(
      roomName: String!
      username: String!
      message: String!
    ): Message!
  }
`;
