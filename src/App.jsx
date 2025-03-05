import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./components /ContactForm/ContactForm";
import SearchBox from "./components /SearchBox/SearchBox";
import ContactList from "./components /ContactList/ContactList";

import users from "./contacts.json";

import { addToLocalStorage, getFromLocalStorage } from "./helpers/localStorage";

const LS_KEY = "contacts";

// getFromLocalStorage(LS_KEY) ||
function App() {
  const [valueContacts, setValueContacts] = useState(
    getFromLocalStorage(LS_KEY) || [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ]
  );
  useEffect(() => {
    addToLocalStorage(LS_KEY, valueContacts);
  }, [valueContacts]);
  const [filter, setFilter] = useState("");

  const addContact = (valueFromForm) => {
    setValueContacts((prevContacts) => {
      return [...prevContacts, valueFromForm];
    });
  };

  const deleteContact = (valueIdContact) => {
    setValueContacts((prevContacts) => {
      return prevContacts.filter((el) => el.id !== valueIdContact);
    });
  };
  const contactsWidthSearch = valueContacts.filter((el) => {
    return el.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onChangeValue={setFilter} />
      <ContactList users={contactsWidthSearch} onDelete={deleteContact} />
    </>
  );
}

export default App;
