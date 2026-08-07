import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';
import { Observable } from 'rxjs';

@Service()
export class ContactsService {
    private apiURL = 'https://localhost:7139/api/contacts';

    private readonly http = inject(HttpClient);

    constructor() { }

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiURL);
    }
}
