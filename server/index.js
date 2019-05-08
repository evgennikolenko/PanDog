const server = require('./config/app');

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`Server has been started on ${port}`));