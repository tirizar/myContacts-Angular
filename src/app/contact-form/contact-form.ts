import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contact } from '../models/contact';


@Component({
  selector: 'app-contact-form',
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {

  
  contact: Contact = {
    contactId: 0,
    name: '',
    email: '',
    phone: '',
    fax: '',
    notes: '',
    lastUpdateDate: new Date(),
    lastUpdateUserName: ''
  };

  onSubmit(): void {
    console.log('Form submitted:', this.contact);
  }


}
