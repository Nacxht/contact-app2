var express = require('express');
var router = express.Router();
const {getContactData} = require('../src/controllers/controller')


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


module.exports = router;
