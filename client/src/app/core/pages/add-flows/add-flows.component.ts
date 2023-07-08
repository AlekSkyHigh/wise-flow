import { Component } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-add-flows',
  templateUrl: './add-flows.component.html',
  styleUrls: ['./add-flows.component.css']
})
export class AddFlowsComponent {

  type: string = '';
  occurrence: string = '';
  amount: number | null = null;
  date: string | null = null;
  description: string = '';
  balance: number = 0; // Declare the balance property

  constructor(
    private entryService: EntryService,
  ) { }

  createEntry() {

    const typeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
    const occurrenceRadio = document.querySelector('input[name="flowOccurrence"]:checked') as HTMLInputElement;

    const entry = {
      type: typeRadio?.value || '',
      occurrence: occurrenceRadio?.value || '',
      amount: this.amount,
      date: this.date,
      description: this.description,
    };

    this.entryService.createEntry(entry)
      .subscribe({
        next: (response) => {
          // Entry created successfully
          console.log(response);

          // TODO
          // Handle any additional logic or redirection here
          const userId = response._ownerId;
          const amount = response.amount;
          const type = response.type;

          this.entryService.updateUserBalance(userId, amount, type)
            .subscribe((balance) => {
              this.balance = balance;
            });


        },
        error: (error) => {
          // Error creating entry
          // Handle the error, display an error message, etc.
        }
      });

  }

}