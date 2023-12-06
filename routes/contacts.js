var express = require('express');
var router = express.Router();
const {
  getContactData,
  addContactData,
  deleteContactData,
  detailContactData,
  editContactData
} = require('../src/controllers/controller')


// Page: Contact list
router.get('/', async (req, res) => {
  try{
    const contactData = await getContactData();

    res.render('contacts', {
      title: "Contact List",
      layout: 'layouts/main-layout',
      contacts: contactData,
      msg: req.flash('msg'),
      error: req.flash('error')
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


// Page: Contact detail
router.get('/detail/:id', async (req, res) => {
  // Get the contact data
  let contactDetail = await detailContactData(req.params.id);
  contactDetail = contactDetail[0];

  res.render('detail-contact', {
    title: `Detail of ${contactDetail.ct_name}`,
    layout: 'layouts/main-layout',
    contact: contactDetail
  })
});


// Page: Edit contact
router.get('/edit/:id', async (req, res) => {
  // Get the contact data
  let contactData = await detailContactData(req.params.id);
  contactData = contactData[0];

  res.render('edit-contact', {
    title: `Editing ${contactData.ct_name}`,
    layout: 'layouts/main-layout',
    contact: contactData
  });
});


// Process: Edit contact
router.post('/edit', async (req, res) => {
  try{
    const editContact = editContactData(req.body);

    // Send message if success
    req.flash('msg', 'Contact data edited successfully!');
    
    // Redirect to contact page
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
  };
});


// Process: Add contact
router.post('/add', async (req, res) => {
  try{
    await addContactData(req.body);
    
    // Send message if success
    req.flash('msg', 'Contact successfully added!');
  
    // Redirect to contact page
    res.redirect('/contacts');
  } catch (err) {
    if (err) throw err;
    
    // Send message if fail
    req.flash('error', 'Contact failed to add!');

    // Redirect to contact page
    res.redirect('/contacts')
  }
});


// Process: Contact delete
router.get('/delete/:ct_id', async (req, res) => {
  try{
  const deleteContact = await deleteContactData(req.params.ct_id);

  // Send message if successfull
  req.flash('msg', 'Contact deleted successfully!');
  
  // Redirect to contacts page
  res.redirect('/contacts');
  } catch (err) {
    // Send message if failed
    req.flash('error', 'Failed to delete contact!')
    throw err;
  }
});

module.exports = router;
