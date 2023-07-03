import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) {}

  registerUser() {
    this.authService.register(this.email, this.password, this.firstName, this.lastName)
      .subscribe({
        next: (response) => {
          // Registration successful, handle the response here
          console.log(response);
        },
        error: (error) => {
          // Registration failed, handle the error here
          console.error(error);
        }
      });
  }
}
