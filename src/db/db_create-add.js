const config = require('./db_config');
const mysql = require('mysql');


const createDBpool = mysql.createPool({
   multipleStatements: true,
   host: 'localhost',
   user: 'zkyzors',
   password: 'gangguanjiwa'
});
createDBpool.on('error', (err) => {
    console.error(err);
});


// Create Database
const createDb = () => {
    return new Promise((resolve, reject) => {
        createDBpool.getConnection((err, connection) => {
            if(err) throw err;

            // Query
            connection.query(
                `CREATE DATABASE contact_app;`,
                (err, results) => {
                    connection.release();
                    if(err) throw err;

                    resolve('Database created successfully!');
                }
            );
        });
    });
};


// Pool
const pool = mysql.createPool(config);
pool.on('error', (err) => {
    console.error(err);
});


// Create Table
const createTable = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;

            // Query
            connection.query(
                `CREATE TABLE contact_list (
                    ct_id INT PRIMARY KEY AUTO_INCREMENT,
                    ct_name VARCHAR(100),
                    ct_phonenum VARCHAR(20),
                    ct_email VARCHAR(100),
                    ct_address TEXT
                );`,
                (err, results) => {
                    connection.release();
                    if(err) throw err;

                    resolve('Table created successfully!');
                }
            );
        });
    });
};


// Data Dummy
sql = `INSERT INTO contact_list (
    ct_name, ct_phonenum, ct_email, ct_address
) VALUES ?;`;
values = [
    ['Wahyono', '0881234567890', 'wahyono@gmail.com', 'Jawa Timur'],
    ['Waluyo', '0881234567890', 'waluyo@gmail.com', 'Jawa Tengah'],
    ['Sutrisno', '0881234567890', 'sutrino@gmail.com', 'Klaten'],
    ['Herman', '0881234567890', 'herman@gmail.com', 'Ngawi'],
    ['Rusdi', '0881234567890', 'rusdi@gmail.com', 'Ngawi'],
    ['Fu\'ad', '0881234567890', 'fuad@gmail.com', 'Bogor'],
    ['Rehan', '0881234567890', 'rehan@gmail.com', 'Bogor']
];

const addDataDummy = () => {
    new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(sql, [values], (err, results) => {
                if (err) throw err;
                resolve('Successfully added data!');
            });
        });
    });
};


// Execution
createDb()
    .then(() => {
        createTable()
    })
    .then(() => {
        addDataDummy()
    })
    .then(() => {
        console.log('Done. Now you can terminate this session');
    });