const mysql = require("mysql");
module.exports = {
    config: {
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "666666",
        database: "happyreading"
    },
    sqlConnect: function(sql, sqlArr, callback) {
        var pool = mysql.createPool(this.config);

        // pool.on('connection', (connection) => {  
        //     connection.query('SET SESSION auto_increment_increment=1'); 
        // });

        pool.getConnection((err, connection) => {
            if (err) {
                console.log('err', err);
                return;
            }

            connection.query(sql, sqlArr, callback);
            connection.release();
        });
    }
}