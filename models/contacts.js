const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
    const result = await fs.readFile(contactsPath)
    return JSON.parse(result);
}

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(el => el.id === contactId);
  return contactById || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null
  }
  const [removedContact] = contacts.splice(index, 1)
  await updateContacts(contacts);
  return removedContact;
}

const addContact = async (body) => {
  const { name,email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name, 
    email,
    phone
  }
  contacts.push(newContact);
  await updateContacts(contacts)
  return newContact ;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(el => el.id === contactId);
  if (index === -1) {
    return null
  }
  contacts[index] = { contactId, ...body };
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
