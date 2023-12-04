const config = require('../db/db_config');
const mysql = require('mysql');

const pool = mysql.createPool(config);
pool.on('error', (err) => {
    console.error(err);
});


// Get all data from contacts table
const getContactData = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            
        // Query
            connection.query(
                `SELECT * FROM contact_list;`,
                (err, results) => {
                    // Close connection
                    connection.release();
                    
                    // Error checking
                    if (err) throw err;
                    
                    // Return the result
                    resolve(results)
                }
            );
        });
    });
}


// Add contact
const addContactData = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Close connection
            connection.query(
                `INSERT INTO contact_list VALUES
                VALUES (${null}, '${data.ct_name}', '${data.ct_phonenum}', '${data.ct_email}', '${data.ct_address}');`,
                (err, results) => {
                    connection.release();

                    if(err) throw err;
                    resolve('Contact successfully added!');
                }
            )
        })
    })
}

module.exports = {
    getContactData,
    addContactData
}