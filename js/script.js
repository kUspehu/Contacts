// Book Class: Represents a Book
class Contact {
  constructor(contact_name, contact_email, contact_phonenum) {
    this.contact_name = contact_name;
    this.contact_email = contact_email;
    this.contact_phonenum = contact_phonenum;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayContacts() {
    // const StoredContacts = [
    //   {
    //     contact_name: "name one",
    //     contact_email: "email one",
    //     contact_phonenum: "11223344",
    //   },
    //   {
    //     contact_name: "name two",
    //     contact_email: "email two",
    //     contact_phonenum: "55667788",
    //   },
    // ];

    // const contacts = StoredContacts;
		const contacts = Store.getContacts()


    contacts.forEach((contact) => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    const list = document.querySelector("#contact-list");

    const row = document.createElement("tr");

    row.innerHTML = `
		<td>${contact.contact_name}</td>
		<td>${contact.contact_email}</td>
		<td>${contact.contact_phonenum}</td>
		<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;
    list.appendChild(row);
  }

  static deleteContact(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

		// Vanish in 3 sec
		setTimeout(() => document.querySelector('.alert').remove(), 2000)
  }

  static clearFields() {
    document.querySelector("#input-name").value = "";
    document.querySelector("#input-email").value = "";
    document.querySelector("#input-phonenum").value = "";
  }
}

// Store Class: Handles Storage
class Store {
	static getContacts() {
		let contacts
		if(localStorage.getItem('contacts') === null){
			contacts = []
		} else {
			contacts = JSON.parse(localStorage.getItem('contacts'))
		}
		return contacts
	}

	static addContact(contact){
		const contacts = Store.getContacts()
		contacts.push(contact)
		localStorage.setItem('contacts', JSON.stringify(contacts))
	}

	static removeContact(contact_phonenum){
		const contacts = Store.getContacts()

		contacts.forEach((contact, index) => {
			if(contact.contact_phonenum === contact_phonenum) {
				contacts.splice(index, 1)
			}
		})

		localStorage.setItem('contacts', JSON.stringify(contacts))
	}
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayContacts);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  //get form values
  const contact_name = document.querySelector("#input-name").value;
  const contact_email = document.querySelector("#input-email").value;
  const contact_phonenum = document.querySelector("#input-phonenum").value;

  //Validate
  if (contact_name === "" || contact_email === "" || contact_phonenum === "") {
    UI.showAlert("Please fill in all fields", 'danger');
  } else {
		// Instatiate contact
		const contact = new Contact(contact_name, contact_email, contact_phonenum);

		// console.log(contact);
	
		//Add Contact to UI
		UI.addContactToList(contact);

		//Add Contact to store
		Store.addContact(contact)

		//Show success message
		UI.showAlert('Contact Added', 'success')
	
		//Clear fields
		UI.clearFields();
	}


});

// Event: Remove a Book
document.querySelector("#contact-list").addEventListener("click", (e) => {
	//Remove contact from UI
  UI.deleteContact(e.target);

	//Remove contact from store
	Store.removeContact(e.target.parentElement.previousElementSibling.innerText)

	//Show success message
UI.showAlert('Contact Removed', 'success')
});

