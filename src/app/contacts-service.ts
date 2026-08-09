import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './models/contact';
import { Observable } from 'rxjs';

@Service()
export class ContactsService {
    private apiURL = 'https://localhost:7139/api/contacts';

    private readonly http = inject(HttpClient);

    constructor() { }

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiURL);
    }

    createContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.apiURL, contact);
    }

    updateContact(contact: Contact): Observable<Contact> {
        const url = `${this.apiURL}/${contact.contactId}`;
        return this.http.put<Contact>(url, contact);
    }

    deleteContact(contactId: number): Observable<void> {
        const url = `${this.apiURL}/${contactId}`;
        return this.http.delete<void>(url);
    }

}
