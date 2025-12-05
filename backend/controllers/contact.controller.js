const Contact = require('../models/contact.model');

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new contact
exports.createContact = async (req, res) => {
  const contact = new Contact({
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    message: req.body.message
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update contact by ID
exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        message: req.body.message
      },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete contact by ID
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete all contacts
exports.deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};