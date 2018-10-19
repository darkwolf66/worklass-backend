var app = require("express")();
var bodyParser = require("body-parser");
var mysql = require("mysql");
const config = require("./config.js")
var cors = require("cors")
const routes = require('./routes');
 
/*
 * Mysql Pool Configs
 */
var pool = mysql.createPool(config.db);
console.log('pool => criado');
pool.on('release', () => console.log('pool => conexão retornada'));
process.on('SIGINT', () => 
    pool.end(err => {
        if(err) return console.log(err);
        console.log('pool => fechado');
        process.exit(0);
    })
); 
/*
* Express Middlewares
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/*
* Connection Middleware
*/
app.use((req, res, next) => {
    pool.getConnection((err, connection) => {
        if(err) return next(err);
        console.log('pool => obteve conexão');
        // adicionou a conexão na requisição
        req.connection = connection;
        // passa a requisição o próximo middleware
        next();
        // devolve a conexão para o pool no final da resposta
        res.on('finish', () => req.connection.release());
    });
});

//Register Routes
app.use('/', require('./routes'));



app.use((err, req, res, next) => {
  console.error(err.stack);
	res.status(500).json({ error: err.toString() });
});

/*
* Express Daemon
*/
var port = process.env.PORT;
app.listen(port, () => {
  console.log('App listening on port '+process.env.PORT);
});
