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
            
        // Melakukan query
            connection.query(
                `SELECT * FROM contact_list;`,
                (err, results) => {
                    // Menutup koneksi
                    connection.release();
                    
                    // Mengecek jika terjadi error
                    if (err) throw err;
                    
                    // Mengembalikan hasil
                    resolve(results)
                }
            );
        });
    });
}


module.exports = {
    getContactData
}