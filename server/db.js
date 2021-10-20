const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "devops",
    database: "testdb",
    host: "130.225.170.203",
    port: 5432
});

module.exports = pool;