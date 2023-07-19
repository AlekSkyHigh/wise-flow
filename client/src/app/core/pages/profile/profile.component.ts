import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EntryService } from 'src/app/services/entry.service';
import { SessionService } from 'src/app/services/session.service';
import { Entry } from 'src/app/types/entry.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  entries: Entry[] | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;
  deleted: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  private destroy$: Subject<void> = new Subject();

  constructor(
    private entryService: EntryService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    const tokenData = this.sessionService.getToken()
    this.firstName = tokenData.firstName;
    this.lastName = tokenData.lastName;
    this.email = tokenData.email;

    this.entryService.fetchUserEntries(tokenData._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((entries: Entry[]) => {
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

    userId = this.sessionService.getToken()._id

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
  updateBalanceAfterDelete(userId: string, amount: number, type: string, deleted: boolean) {
    this.entryService.updateUserBalance(userId, amount, type, deleted).subscribe({})
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
