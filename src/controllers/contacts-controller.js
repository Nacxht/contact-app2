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
};


// Add contact
const addContactData = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `INSERT INTO contact_list (ct_name, ct_phonenum, ct_email, ct_address) VALUES (?, ?, ?, ?)`,
                [data.ct_name, data.ct_phonenum, data.ct_email, data.ct_address],
                (err, results) => {
                    // Close connection
                    connection.release();

                    if(err) throw err;
                    resolve({message: 'Contact successfully added!'});
                }
            )
        })
    })
};


// Delete contact
const deleteContactData = (ct_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `DELETE FROM contact_list WHERE ct_id = ${ct_id};`,
                (err, results) => {
                    // CLose connection
                    connection.release();

                    if(err) throw err;
                    resolve({message: 'Contact deleted successfully!'});
                }
            )
        })
    })
};


// Detail contact
const detailContactData = (ct_id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `SELECT * FROM contact_list WHERE ct_id = ${ct_id};`,
                (err, results) => {
                    connection.release();

                    if(err) throw err;
                    resolve(results);
                }
            );
        });
    });
};


// Edit contact
const editContactData = (data) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `
                UPDATE contact_list
                SET ct_name = ?, ct_phonenum = ?, ct_email = ?, ct_address = ?
                WHERE ct_id = ${data.ct_id};
                `,
                [data.ct_name, data.ct_phonenum, data.ct_email, data.ct_address],
                (err, results) => {
                    connection.release();

                    if (err) throw err;
                    resolve({message: 'Contact data edited successfully!'});
                }
            )
        });
    });
};

module.exports = {
    getContactData,
    addContactData,
    deleteContactData,
    detailContactData,
    editContactData
};