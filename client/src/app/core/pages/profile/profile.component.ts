import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Entry } from 'src/app/types/entry.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  entries: Entry[] | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    console.log('userId after decode in ProfileComponenet = ', userId);

    this.authService.fetchUserEntries(userId).subscribe((entries: Entry[]) => {
      console.log(entries);
      this.entries = entries
    })
    
  }

}
