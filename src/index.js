const  express =  require('express');
const cors = require('cors')
const server = express();
const PORT = '3001';

//require routes
const RouteTask = require('./routes/RoutesTask');
//uses
server.use(cors());
server.use(express.json());
//use routes
server.use('/task',RouteTask);
//listen
server.listen(PORT,
    ()=>console.log(`API online port:${PORT}`)
    );