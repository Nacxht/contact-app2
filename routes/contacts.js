var express = require('express');
var router = express.Router();
const {getContactData, addContactData} = require('../src/controllers/controller')


// Page: Contact list
router.get('/', async (req, res) => {
  try{
    const contactData = await getContactData();

    res.render('contacts', {
      title: "Contact List",
      layout: 'layouts/main-layout',
      contacts: contactData,
      msg: req.flash('msg')
  });
  } catch (err) {
    console.error(err);
    res.status(500).json
  }
});


// Page: Add contact
router.get('/add', (req, res) => {
  res.render('add-contact', {
    title: 'Add Contact',
    layout: 'layouts/main-layout'
  })
});


// Process: Add contact
router.post('/', async (req, res) => {
  try{
    await addContactData(req.body);
    
    // Send message if success
    req.flash('msg', 'Contact successfully added!');
  
    // Redirect to contact page
    res.redirect('/contacts');
  } catch (err) {
    if (err) throw err;
    
    // Send message if fail
    req.flash('msg', 'Contact failed to add!');

    // Redirect to contact page
    res.redirect('/contacts')
  }
});


// Process: Contact Delete

module.exports = router;
