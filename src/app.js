const express = require('express');
const server = express();
const path = require('path')
// routes
const minefieldRoutes = require('./routes/minefield.routes');
// config
const port = 8000;

server.use(express.static(path.dirname('public') +'/public'));

server.use('/api', minefieldRoutes)

server.listen(process.env.PORT || port, () => {
    console.log(`server ir running in port: ${port}`)
});
