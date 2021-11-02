const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "devops",
    database: "devops",
    host: "130.225.170.203",
    port: 5432
});

module.exports = pool;