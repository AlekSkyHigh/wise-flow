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
      .subscribe(
        {
          next: () => {
            // Registration successful
            // Now, you can directly call the login method to authenticate the user
            this.authService.login(this.email, this.password)
              .subscribe(
                {
                  next: (response: any) => {
                    // Login successful
                    const token = response.accessToken; 
                    console.log(token); //*!undefined
                    

                    // Store the token in local storage
                    localStorage.setItem('token', token);

                    // Additional logic or redirection after successful registration and login
                  },
                  error: (error) => {
                    // Login failed
                    console.error(error);
                  }
                }
              );
          },
          error: (error) => {
            // Registration failed
            console.error(error);
          }
        }
      );
  }
}
