import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EntryService } from 'src/app/services/entry.service';
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
  deleted: boolean = false;

  constructor(
    private authService: AuthService,
    private entryService: EntryService
  ) { }

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();

    this.authService.fetchUserEntries(userId).subscribe((entries: Entry[]) => {
      console.log('fetchUserEntries: ', entries);
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

  //* Deleting a specified entry:
  deleteEntry(entryId: string, userId: string, amount: number, type: string) {

    userId = this.authService.getCurrentUserId();


    this.entryService.deleteEntry(entryId).subscribe({
      next: () => {
        // Remove the deleted entry from the local entries array
        this.entries = this.entries?.filter(entry => entry._id !== entryId);

        // Adjust the user balance in database accordingly:
        this.deleted = true;
        this.updateBalanceAfterDelete(userId, amount, type, this.deleted);
      },
      error: (error) => {
        console.error(error);
        // Handle the error if needed
      }
    });
  }

  // * Update user`s balance after an entry deletion:
  updateBalanceAfterDelete(userId: string, amount: number, type: string, deleted: boolean){

    this.entryService.updateUserBalance(userId, amount, type, deleted).subscribe({

    })
      
  }
}
