import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [RouterModule],
  providers: [CookieService],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  private cookieService = inject(CookieService);
  private router = inject(Router);

  ngOnInit(): void {
    // Clear the username cookie on logout
    this.cookieService.delete('username');
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
