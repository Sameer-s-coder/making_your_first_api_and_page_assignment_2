const express = require('express');
const app = express();

// Predefined HTTP status codes and their descriptions
const statusDescriptions = {
  200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
  201: "Created: The request has been fulfilled and has resulted in one or more new resources being created.",
  204: "No Content: The server successfully processed the request and is not returning any content.",
  400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
  401: "Unauthorized: The request requires user authentication.",
  403: "Forbidden: The server understood the request but refuses to authorize it.",
  404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
  405: "Method Not Allowed: The request method is known by the server but is not supported by the target resource.",
  429: "Too Many Requests: The user has sent too many requests in a given amount of time (rate limiting).",
  500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
  502: "Bad Gateway: The server received an invalid response from the upstream server.",
  503: "Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance.",
  504: "Gateway Timeout: The server did not receive a timely response from an upstream server."
};

// GET endpoint for status code information
app.get('/status-info', (req, res) => {
  const code = parseInt(req.query.code, 10);

  if (isNaN(code)) {
    return res.status(400).json({
      error: "Invalid status code. Please provide a numeric HTTP status code as the query parameter."
    });
  }

  const message = statusDescriptions[code];

  if (!message) {
    return res.status(404).json({
      error: "Status code not found in the predefined list. Please provide a valid HTTP status code."
    });
  }

  res.json({
    status: code,
    message: message
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status Code API is running on http://localhost:${PORT}`);
});
