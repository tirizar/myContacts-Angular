import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList {
  contacts: Contact[] = [
    {ContactId: 1, Name: 'John Doe', Email: 'joe@email.com', Phone: '123-456-7890', Fax: '123-456-7891', Notes: 'Sample contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'},
    {ContactId: 2, Name: 'Jane Smith', Email: 'jane@email.com', Phone: '987-654-3210', Fax: '987-654-3211', Notes: 'Another contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'},
    {ContactId: 3, Name: 'Bob Johnson', Email: 'bob@email.com', Phone: '555-123-4567', Fax: '555-123-4568', Notes: 'Third contact', LastUpdateDate: new Date(), LastUpdateUserName: 'admin'}
  ];
}

