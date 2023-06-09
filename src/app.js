const express = require('express');
const server = express();
// routes
const minefieldRoutes = require('./routes/minefield.routes');
// config
const port = 8000;

server.use(express.static('public'));

server.use('/', minefieldRoutes)

server.listen(process.env.PORT || port, () => {
    console.log(`server ir running in port: ${port}`)
});
