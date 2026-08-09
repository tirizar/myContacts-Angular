import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private cookieService = inject(CookieService);

  username: string = '';

  onSubmit(): void {
    console.log('Login form submitted with username:', this.username);
    if (!this.username) {
      console.error('Username is required.');
      return;
    }
    else {
    // Store the username in a cookie
    this.cookieService.set('username', this.username);
    // Redirect to the contacts page after successful login
    window.location.href = '/contacts';
    }
    
  }

}
