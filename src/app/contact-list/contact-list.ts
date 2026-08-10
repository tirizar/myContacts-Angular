import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../contacts-service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit {

  username: string = '';
  contacts: Contact[] = [];
  searchTerm: string = '';
  
  constructor(private contactsService: ContactsService, private cdRef: ChangeDetectorRef, private cookieService: CookieService) {
    console.log('ContactList component constructor called');
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
    this.getContacts();
    console.log('Contacts after getContacts call:', this.contacts);
  }

  getContacts(): void {
    /*
    this.contacts = [
    {ContactId: 1, Name: 'John Doe', Email: 'joe@email.com', Phone: '123-456-7890', Fax: '123-456-7891', Notes: 'Sample contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'},
    {ContactId: 2, Name: 'Jane Smith', Email: 'jane@email.com', Phone: '987-654-3210', Fax: '987-654-3211', Notes: 'Another contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'},
    {ContactId: 3, Name: 'Bob Johnson', Email: 'bob@email.com', Phone: '555-123-4567', Fax: '555-123-4568', Notes: 'Third contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'}
    ]; */
    console.log('Fetching contacts from API...');
    this.contactsService.getContacts().subscribe((contactsFromAPI: Contact[]) => {
      this.contacts = contactsFromAPI;
      this.cdRef.detectChanges(); // Trigger change detection to update the view
      console.log('Contacts retrieved from API:', this.contacts);
    });
  }

  onSubmit(searchForm: NgForm): void {
    console.log('Searching contacts with term:', this.searchTerm);
    if (this.searchTerm.trim() === '') {
      // If search term is empty, fetch all contacts
      this.getContacts();
    } else {
      this.contactsService.searchContacts(this.searchTerm).subscribe((contactsFromAPI: Contact[]) => {
        this.contacts = contactsFromAPI;
        this.cdRef.detectChanges(); // Trigger change detection to update the view
        console.log('Search results:', this.contacts);
      });
    }
  }

  

    /*contacts: Contact[] = [
    {ContactId: 1, Name: 'John Doe', Email: 'joe@email.com', Phone: '123-456-7890', Fax: '123-456-7891', Notes: 'Sample contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'},
    {ContactId: 2, Name: 'Jane Smith', Email: 'jane@email.com', Phone: '987-654-3210', Fax: '987-654-3211', Notes: 'Another contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'},
    {ContactId: 3, Name: 'Bob Johnson', Email: 'bob@email.com', Phone: '555-123-4567', Fax: '555-123-4568', Notes: 'Third contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'}
  ];*/
}

