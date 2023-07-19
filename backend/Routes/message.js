// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store WebSocket connections for subscribers
const subscribers = new Set();

wss.on('connection', (ws) => {
  console.log('A client connected.');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    try {
      const data = JSON.parse(message);

      // Handle publish-subscribe messages
      if (data.action === 'subscribe') {
        subscribers.add(ws);
        console.log('Client subscribed for notifications.');
      } else if (data.action === 'unsubscribe') {
        subscribers.delete(ws);
        console.log('Client unsubscribed from notifications.');
      }

      // Handle request-reply messages
      if (data.action === 'request') {
        // Process the request and generate a response
        const response = {
          message: 'This is a response to your request.',
          // Include any relevant data in the response
        };
        ws.send(JSON.stringify(response));
        console.log('Response sent to client:', response);
      }
    } catch (error) {
      console.error('Error parsing message:', error.message);
    }
  });

  ws.on('close', () => {
    subscribers.delete(ws);
    console.log('A client disconnected.');
  });
});

const PORT = 8080; // Replace with your desired port number
server.listen(PORT, () => {
  console.log(`WebSocket server started on port ${PORT}`);
});
