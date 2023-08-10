import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-add-flows',
  templateUrl: './add-flows.component.html',
  styleUrls: ['./add-flows.component.css']
})
export class AddFlowsComponent implements OnInit, OnDestroy {
  type: string = '';
  occurrence: string = '';
  amount: number | null = null;
  date: string | null = null;
  description: string = '';
  balance: Observable<number | undefined> | undefined;
  deleted: boolean = false;
  errorMessages: string[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private entryService: EntryService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    const tokenData = this.sessionService.getToken();
  
    const balanceSubscription = this.entryService.fetchUserBalance(tokenData._id).subscribe(balance => {
      this.balance = of(balance);
    });
  
    this.subscriptions.push(balanceSubscription);
  }
  
  createEntry() {
    const typeRadio = document.querySelector(
      'input[name="flowType"]:checked'
    ) as HTMLInputElement;
    const occurrenceRadio = document.querySelector(
      'input[name="flowOccurrence"]:checked'
    ) as HTMLInputElement;

    const entry = {
      type: typeRadio?.value || '',
      occurrence: occurrenceRadio?.value || '',
      amount: this.amount,
      date: this.date,
      description: this.description,
    };

    const createEntrySubscription = this.entryService.createEntry(entry).subscribe({
      next: (response) => {

        const userId = response._ownerId;
        const amount = response.amount;
        const type = response.type;
        this.deleted = false;

        this.entryService.updateUserBalance(userId, amount, type, this.deleted).subscribe(() => {
          this.entryService.fetchUserBalance(userId).subscribe((balance) => {
            this.balance = of(balance);
            const navigationExtras: NavigationExtras = {
              skipLocationChange: true,
            };
            this.router.navigate(['/add-flows'], navigationExtras);

            this.type = '';
            this.occurrence = '';
            this.amount = null;
            this.date = null;
            this.description = '';
          });
        });
      },
      error: (error) => {
        if (error && error.error && error.error.message) {
          this.errorMessages = error.error.message;
        } else {
          this.errorMessages = ['Unknown error occurred.'];
        }
      },
    });

    this.subscriptions.push(createEntrySubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
