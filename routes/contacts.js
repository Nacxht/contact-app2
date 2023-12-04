var express = require('express');
var router = express.Router();
const {getContactData, addContactData} = require('../src/controllers/controller')


// Page: Contact list
router.get('/', async (req, res, next) => {
  try{
    const contactData = await getContactData();

    res.render('contacts', {
      title: "Contact List",
      layout: 'layouts/main-layout',
      contacts: contactData
  });
  } catch (err) {
    console.error(err);
    res.status(500).json
  }
});


// Page: Add contact
router.get('/add', (req, res, next) => {
  res.render('add-contact', {
    title: 'Add Contact',
    layout: 'layouts/main-layout'
  })
});


// Process: Add contact
router.post('/contacts', async (req, res, next) => {
  try{
  const addContact = await addContactData(req.body);
    
  res.redirect('/contact');
  req.flash('msg', addContact)
  } catch (err) {
    if (err) throw err;
  }
})

module.exports = router;
