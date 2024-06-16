import React, { useState, useEffect } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
    setContacts([...contacts, { ...newContact, id: newId }]);
    setShowForm(false);
    setNewContact({ name: "", username: "", phone: "" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewContact({ name: "", username: "", phone: "" });
  };

  return (
    <div className="App">
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.username}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showForm && (
        <button
          className="add"
          onClick={() => setShowForm(true)}>
          Add New Contact
        </button>
      )}
      {showForm && (
        <div>
          <h2>Add New Contact</h2>
          <form>
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                value={newContact.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Phone: </label>
              <input
                type="text"
                name="phone"
                value={newContact.phone}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              className="save"
              onClick={handleSave}>
              Save
            </button>
            <button
              type="button"
              className="cancel"
              onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contacts;
