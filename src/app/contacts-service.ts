import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './models/contact';
import { Observable, map } from 'rxjs';

@Service()
export class ContactsService {
    private apiURL = 'https://localhost:7139/api/contacts';

    private readonly http = inject(HttpClient);

    constructor() { }

    private mapContact(apiContact: any): Contact {
        return {
            contactId: apiContact.contactId ?? apiContact.ContactId ?? 0,
            name: apiContact.name ?? apiContact.Name ?? '',
            email: apiContact.email ?? apiContact.Email ?? '',
            phone: apiContact.phone ?? apiContact.Phone ?? '',
            fax: apiContact.fax ?? apiContact.Fax ?? '',
            notes: apiContact.notes ?? apiContact.Notes ?? '',
            lastUpdateDate: apiContact.lastUpdateDate ? new Date(apiContact.lastUpdateDate) : apiContact.LastUpdateDate ? new Date(apiContact.LastUpdateDate) : new Date(),
            lastUpdateUserName: apiContact.lastUpdateUserName ?? apiContact.LastUpdateUserName ?? ''
        };
    }

    getContacts(): Observable<Contact[]> {
        return this.http.get<any[]>(this.apiURL).pipe(
            map((contacts) => contacts.map((contact) => this.mapContact(contact)))
        );
    }

    searchContacts(searchTerm: string): Observable<Contact[]> { 
        const url = `${this.apiURL}/search?query=${searchTerm}`;
        return this.http.get<any[]>(url).pipe(
            map((contacts) => contacts.map((contact) => this.mapContact(contact)))
        );
    }

    getContactById(contactId: number): Observable<Contact> {
        const url = `${this.apiURL}/${contactId}`;
        return this.http.get<any>(url).pipe(
            map((contact) => this.mapContact(contact))
        );
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
