const pg = require ('pg');
const pool = new pg.Pool({
    database: "todolist",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
});

module.exports = pool;