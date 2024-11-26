import { gql } from "@apollo/client";

export const CREATE_ROOM = gql`
  mutation CreateRoom($roomName: String!) {
    createRoom(roomName: $roomName) {
      roomName
      messages {
        username
        message
        timestamp
      }
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation PostMessage(
    $roomName: String!
    $username: String!
    $message: String!
  ) {
    postMessage(roomName: $roomName, username: $username, message: $message) {
      username
      message
      timestamp
    }
  }
`;

export const GET_ROOMS = gql`
  query GetRooms {
    getRooms {
      roomName
      messages {
        username
        message
        timestamp
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($roomName: String!) {
    getMessages(roomName: $roomName) {
      username
      message
      timestamp
    }
  }
`;
