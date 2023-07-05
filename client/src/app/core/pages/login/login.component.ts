import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          // Login successful
          const token = response; // Assuming the server sends the token as 'token' property in the response
          console.log(token);
          
          // Store the token in local storage
          localStorage.setItem('token', token);

          // Additional logic or redirection after successful login
          this.router.navigate(['/']); // Replace with the desired route
        },
        error: (error) => {
          // Login failed
          console.error(error);
        }
      });
  }
}
