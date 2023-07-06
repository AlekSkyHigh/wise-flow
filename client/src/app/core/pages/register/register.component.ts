import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  repass: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    this.authService.register(this.email, this.password, this.firstName, this.lastName)
      .pipe(
        switchMap(() => this.authService.login(this.email, this.password))
      )
      .subscribe({
        next: (response: any) => {
          // Registration and login successful
          const token = response;

          // Store the token in local storage
          localStorage.setItem('token', token);

          // Additional logic or redirection after successful registration and login
          this.router.navigate(['/']); // Replace with the desired route
        },
        error: (error) => {
          // Registration or login failed
          this.errorMessage = error.error.message;
        }
      });
  }
}

