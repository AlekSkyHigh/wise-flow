import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

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

  constructor(
    public authService: AuthService,
    private sessionService: SessionService,
    private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        //console.log(data);
        this.sessionService.clearSession();
        // this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}