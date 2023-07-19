import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: any;

  constructor(
    private authService: AuthService, 
    private sessionService: SessionService,
    private router: Router) {}

  loginUser() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          // Login successful
          const token = response;

          this.sessionService.createSession(token);

          this.router.navigate(['/']); // Replace with the desired route
        },
        error: (error) => {
          // Login failed
          this.errorMessage = error.error.message;
        }
      });
  }
}
