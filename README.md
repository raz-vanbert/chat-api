# Chat API


Welcome to the Chat API, a robust and flexible API designed to facilitate real-time chat functionalities in your applications. Built with modern technologies, this API allows developers to create, manage, and interact with chat rooms seamlessly using GraphQL and Express.js.

## Key Features

* Real-Time Communication: Enable instant messaging between users within chat rooms.

* GraphQL Integration: Leverage the power of GraphQL for efficient data querying and mutations.

* Room Management: Create and manage multiple chat rooms to organize conversations.

* Message Handling: Post and retrieve messages with timestamps for better tracking.

* CORS Enabled: Easily integrate with frontend applications by allowing cross-origin requests.

* Modular Design: Extend and customize the API to fit your specific needs.

## Technologies Used

* Node.js: A JavaScript runtime for building scalable network applications.
* Express.js: A minimal and flexible Node.js web application framework.
* Apollo Server Express: Integrates Apollo Server with Express for building GraphQL APIs.
* GraphQL: A query language for your API, providing a more efficient and powerful alternative to REST.
* CORS: Middleware to enable Cross-Origin Resource Sharing.

## Why Choose This Chat API?

Whether you’re building a simple chat application or integrating chat functionalities into a larger platform, the Chat API offers a straightforward and efficient solution. Its GraphQL-based architecture ensures that your frontend applications can fetch exactly the data they need, reducing over-fetching and improving performance.

## Getting Started

Getting started with the Chat API is easy. Follow the setup instructions below to integrate the API into your project and start building engaging chat experiences for your users.

Feel free to customize this introduction to better fit the specific details and unique aspects of your Chat API project. If you need further sections or additional information for your README, let me know!


## Example Queries and Mutations

Use the following GraphQL queries and mutations in Insomnia to interact with your Chat API.

### 1. Create a Room

Mutation to create a new chat room named “general”:

```
mutation {
  createRoom(roomName: "general") {
    roomName
    messages {
      username
      message
      timestamp
    }
  }
}
```

Expected Response:

```
{
  "data": {
    "createRoom": {
      "roomName": "general",
      "messages": []
    }
  }
}
```

### 2. Post a Message to a Chat Room

Mutation to post a message from user “Alice” to the “general” room:

```
mutation {
  postMessage(roomName: "general", username: "Alice", message: "Hello, everyone!") {
    username
    message
    timestamp
  }
}
```

Expected Response:

```
{
  "data": {
    "postMessage": {
      "username": "Alice",
      "message": "Hello, everyone!",
      "timestamp": "2024-04-27T12:34:56.789Z"
    }
  }
}
```

### 3. Retrieve All Chat Rooms

Query to fetch all available chat rooms along with their messages:

```
query {
  getRooms {
    roomName
    messages {
      username
      message
      timestamp
    }
  }
}
```

Expected Response:

```
{
  "data": {
    "getRooms": [
      {
        "roomName": "general",
        "messages": [
          {
            "username": "Alice",
            "message": "Hello, everyone!",
            "timestamp": "2024-04-27T12:34:56.789Z"
          }
        ]
      }
    ]
  }
}
```

### 4. Retrieve Messages from a Specific Room

Query to fetch all messages from the “general” room:

```
query {
  getMessages(roomName: "general") {
    username
    message
    timestamp
  }
}
```

Expected Response:

```
{
  "data": {
    "getMessages": [
      {
        "username": "Alice",
        "message": "Hello, everyone!",
        "timestamp": "2024-04-27T12:34:56.789Z"
      }
    ]
  }
}
```

### Using Insomnia to Execute GraphQL Requests

    1.	Open Insomnia and navigate to your workspace.
    2.	Create a New Request:
    •	Click on the ”+” button or “New Request”.
    •	Name your request (e.g., “Create Chat Room”) and select “GraphQL” as the request type.
    3.	Enter the GraphQL Query or Mutation:
    •	Copy and paste the desired query or mutation from above into the editor.
    4.	Send the Request:
    •	Click “Send” to execute the request.
    5.	Review the Response:
    •	Check the response pane to verify that the operation was successful.

---

## Usage Example in a Client Application

Integrate the Chat API into your client-side application to create chat rooms, post messages, and retrieve messages seamlessly. This example uses React and Apollo Client to interact with the GraphQL endpoints provided by the Chat API.

### Prerequisites

* Node.js and npm installed on your machine.
* Basic knowledge of React and GraphQL.
* Your Chat API server running locally at http://localhost:3000/graphql.

### Setting Up the React Application

### 1.	Install Apollo Client and GraphQL

`npm install @apollo/client graphql`


### Configuring Apollo Client

Create an Apollo Client instance to connect to your GraphQL server.

### 1.	Create ApolloProvider

```
// src/ApolloProvider.js
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) =>
      console.log(`GraphQL error: ${message}`)
    );
  }
  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:3000/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const ApolloProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
```

### 2.	Wrap Your App with ApolloProvider

```
src/index.js

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloProvider from './ApolloProvider';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Creating GraphQL Queries and Mutations

Define the necessary GraphQL operations to interact with the Chat API.

### Building the User Interface

Create React components to interact with the Chat API.
### 1.	Create App.js

```
src/App.js

// src/App.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ROOMS, CREATE_ROOM, POST_MESSAGE, GET_MESSAGES } from '@raz-vanbert/chat-api';

const App = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_ROOMS);

  const [createRoom] = useMutation(CREATE_ROOM, {
    onCompleted: () => {
      setRoomName('');
      refetch();
    },
  });

  const [postMessage] = useMutation(POST_MESSAGE, {
    onCompleted: () => {
      setMessage('');
      refetch();
    },
  });

  const handleCreateRoom = () => {
    if (roomName.trim() === '') return;
    createRoom({ variables: { roomName } });
  };

  const handlePostMessage = () => {
    if (!selectedRoom || username.trim() === '' || message.trim() === '') return;
    postMessage({
      variables: { roomName: selectedRoom, username, message },
    });
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error loading rooms.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Chat API Client</h1>

      {/* Create Room */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Create a New Room</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room Name"
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>

      {/* List Rooms */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Available Rooms</h2>
        <ul>
          {data.getRooms.map((room) => (
            <li key={room.roomName}>
              <button onClick={() => setSelectedRoom(room.roomName)}>
                {room.roomName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Room */}
      {selectedRoom && (
        <div>
          <h2>Room: {selectedRoom}</h2>

          {/* Messages */}
          <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
            <Messages roomName={selectedRoom} />
          </div>

          {/* Post Message */}
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
            />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
            />
            <button onClick={handlePostMessage}>Send Message</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Messages = ({ roomName }) => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { roomName },
    pollInterval: 2000, // Refresh messages every 2 seconds
  });

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages.</p>;

  return (
    <ul>
      {data.getMessages.map((msg, index) => (
        <li key={index}>
          <strong>{msg.username}</strong>: {msg.message} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
        </li>
      ))}
    </ul>
  );
};

export default App;
```

### 2.	Explanation of Components

* Apollo Client Setup (ApolloProvider.js):
* Initializes Apollo Client with error handling and connects to the GraphQL endpoint.
* GraphQL Operations (operations.js):
* Defines the necessary queries and mutations for interacting with the Chat API.
* Main App Component (App.js):
* Create Room: Allows users to create new chat rooms.
* List Rooms: Displays available chat rooms and allows users to select one.
* Messages Component: Fetches and displays messages from the selected room, refreshing every 2 seconds.
* Post Message: Enables users to send messages to the selected chat room.