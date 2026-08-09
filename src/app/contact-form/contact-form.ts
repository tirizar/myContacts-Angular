import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contact } from '../models/contact';
import { NgxMaskDirective } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';
import { ContactsService } from '../contacts-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact-form',
  imports: [RouterModule, RouterLink, FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {

  username: string = '';
  
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

  errorMessage: string = '';

  constructor(private cookieService: CookieService, private contactsService: ContactsService) {
    console.log('ContactForm component constructor called');
  }

  ngOnInit(): void {
    // Fetch the username from the cookie
    this.username = this.cookieService.get('username');
    //if the username is empty, redirect to login page
    if (!this.username) {
      console.log('Username not found in cookie, redirecting to login page');
      window.location.href = '/login';
      return;
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.contact);
    this.contactsService.createContact(this.contact).subscribe({
      next: () => {
        console.log('Contact created successfully');
        // Redirect or update the contact list as needed
        window.location.href = '/contacts';
      },
      error: (error) => {
        console.error('Error message:', error.message);
        console.error('Error creating contact:', error);

        this.errorMessage = error?.error?.message || error?.message || 'An error occurred while creating the contact.';
      }
    });
  }


}
