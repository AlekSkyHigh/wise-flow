import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = new User(); // Create a new instance of the User model

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.registerUser(this.user)
      console.log(this.user);
      
  }
}
