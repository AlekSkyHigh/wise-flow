import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Entry } from 'src/app/types/entry.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  entries: Entry[] | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();

    this.authService.fetchUserEntries(userId).subscribe((entries: Entry[]) => {
      console.log(entries);
      this.entries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.totalItems = entries.length;
    })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

}
