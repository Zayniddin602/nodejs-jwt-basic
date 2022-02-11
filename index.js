const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const port = process.env.PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//in the .env file:

// PORT=5000
// MONGO_URI = mongodb://localhost:27017/dbname
// TOKEN_KEY = some_secret_key