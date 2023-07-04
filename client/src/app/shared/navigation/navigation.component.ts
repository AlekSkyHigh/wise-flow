import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// Initialization for ES Users
import {
  Collapse,
  initTE,
} from "tw-elements";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  ngAfterViewInit() {

    initTE({ Collapse });

  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to login page after logout
  }
}