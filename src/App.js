import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Section from './components/Section';
import Notification from './components/Notification';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');

    localContacts
      ? this.setState({ contacts: JSON.parse(localContacts) })
      : this.setState({ contacts: initialContacts });
  }

  componentDidUpdate(_, prevState) {
    prevState.contacts !== this.state.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  isContactExist = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="container">
        <ToastContainer />

        <Section title="Phonebook">
          <ContactForm
            onFormSubmit={this.addContact}
            isContactExist={this.isContactExist}
          />
        </Section>
        <Section title={'Contacts'}>
          {this.state.contacts.length > 0 ? (
            <>
              <Filter value={this.state.filter} onChange={this.changeFilter} />
              {visibleContacts.length > 0 ? (
                <ContactList
                  data={visibleContacts}
                  onDeleteContact={this.deleteContact}
                />
              ) : (
                <Notification text={'No contacts found'} />
              )}
            </>
          ) : (
            <Notification text={'No contacts in the list'} />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
