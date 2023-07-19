import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EntryService } from 'src/app/services/entry.service';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-add-flows',
  templateUrl: './add-flows.component.html',
  styleUrls: ['./add-flows.component.css']
})
export class AddFlowsComponent implements OnInit {
  type: string = '';
  occurrence: string = '';
  amount: number | null = null;
  date: string | null = null;
  description: string = '';
  balance: Observable<number | undefined> | undefined;
  deleted: boolean = false;
  errorMessages: string[] = [];

  constructor(
    private entryService: EntryService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    const tokenData = this.sessionService.getToken()
    
    this.balance = this.entryService.fetchUserBalance(tokenData._id);
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

    this.entryService.createEntry(entry).subscribe({
      next: (response) => {
        // Entry created successfully
        console.log(response);

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
  }
}
