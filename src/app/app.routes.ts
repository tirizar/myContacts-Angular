// app.routes.ts
import { Routes } from '@angular/router';
import { ContactList } from './contact-list/contact-list';
import { ContactForm } from './contact-form/contact-form';
import { Login } from './login/login';
import { Logout } from './logout/logout';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'contacts/new', component: ContactForm },
  { path: 'contacts/edit/:id', component: ContactForm },
  { path: 'contacts', component: ContactList, pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout }
];