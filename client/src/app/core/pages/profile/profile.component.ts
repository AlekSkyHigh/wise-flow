import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { EntryService } from 'src/app/services/entry.service';
import { SessionService } from 'src/app/services/session.service';
import { Entry } from 'src/app/types/entry.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  entries: Entry[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;
  deleted: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  balance: Observable<number | undefined> | undefined;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private entryService: EntryService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    const tokenData = this.sessionService.getToken()
    this.firstName = tokenData.firstName;
    this.lastName = tokenData.lastName;
    this.email = tokenData.email;

    this.balance = this.entryService.fetchUserBalance(tokenData._id);

    this.entryService.fetchUserEntries(tokenData._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
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
        //* Remove the deleted entry from the local entries array
        this.entries = this.entries?.filter(entry => entry._id !== entryId);

        //* Adjust the user balance in database accordingly:
        this.deleted = true;

        //* Dynamically update the UI
        this.entryService.updateUserBalance(userId, amount, type, this.deleted).subscribe(() => {
          this.entryService.fetchUserBalance(userId).subscribe((balance) => {
            this.balance = of(balance);

            this.entryService.fetchUserEntries(userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe((entries: Entry[]) => {
                this.entries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                this.totalItems = entries.length;

                const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
                const lastPage = totalPages > 0 ? totalPages : 1;
                if (this.currentPage > lastPage && (this.totalItems - this.itemsPerPage * (this.currentPage - 1)) === 0) {
                  this.currentPage = Math.max(this.currentPage - 1, 1);
                }
              })

            const navigationExtras: NavigationExtras = {
              skipLocationChange: true,
            };
            this.router.navigate(['/profile'], navigationExtras);
          });
        });
        
      },
      error: (error) => {
        console.error(error);
        // Handle the error if needed
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
