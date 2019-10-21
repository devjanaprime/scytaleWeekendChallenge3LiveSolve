const pg = require( 'pg' );

const pool = pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 15,
    idleTimeoutMillis: 30000
}); // end Pool

module.exports = pool;