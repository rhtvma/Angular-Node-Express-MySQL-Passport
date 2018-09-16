const config = require('config');
const mysqlConfig = config.get('mysql');
const mysql = require('mysql'),
    con = "",
    isConnAlive = false,
    pool = mysql.createPool(
        {
            connectionLimit: mysqlConfig.connectionLimit,
            host: mysqlConfig.host,
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.database
        }
    );

exports.executeQuery = (q, params, cb) => {
    pool.getConnection((err, conn) => {
        if (!!err) {
            console.log(`Error: ${err.message} ${err.stack}`);
            return;
        }

        conn.query(q, params, (e, rows, fields) => {
            conn.release();
            if (typeof cb === 'function')
                cb(e, rows);
        });
    });
};