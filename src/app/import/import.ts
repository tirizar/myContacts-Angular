import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService} from 'ngx-cookie-service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../contacts-service';

@Component({
  selector: 'app-import',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
      providers: [CookieService],
  templateUrl: './import.html',
  styleUrl: './import.css',
})

export class Import {

  submitted: boolean = false;
  selectedFile: File | null = null;
  username : string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private contactsService: ContactsService, private cdRef: ChangeDetectorRef, private cookieService: CookieService, private router: Router) {
    console.log('Import component constructor called');
  }

  ngOnInit(): void {
    // Fetch the username from the cookie
    this.username = this.cookieService.get('username');
    //if the username is empty, redirect to login page
    if (!this.username) {
      console.log('Username not found in cookie, redirecting to login page');
      this.router.navigate(['/login']);
      return;
    }
  }

  // Capture the file from the HTML input event
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Send the file to the service
  onUpload(importForm: any): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (importForm.invalid || !this.selectedFile) {
      console.log('Upload blocked: validation errors present.');
      return;
    }

    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
      this.contactsService.uploadCsv(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.successMessage = 'CSV uploaded successfully!';
          this.errorMessage = '';
          importForm.resetForm();
          this.selectedFile = null;
          this.submitted = false;
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.errorMessage = error?.message || 'Failed to upload CSV file.';
          this.successMessage = '';
        }
      });
    }
  }

}
