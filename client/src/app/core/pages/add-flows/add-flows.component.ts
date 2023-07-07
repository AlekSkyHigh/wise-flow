import { Component } from '@angular/core';
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

  // Define userId variable
  userId: string = '';
  balance: number = 0;

  constructor(private entryService: EntryService) { }

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
          
          // Handle any additional logic or redirection here
          this.entryService.getEntriesByUser(response._ownerId)
            .subscribe(entries => {
              // Calculate balance based on entries
              this.balance = entries.reduce((total, entry) => total + entry.amount, 0);
              console.log('Balance:', this.balance);
            })
        },
        error: (error) => {
          // Error creating entry
          // Handle the error, display an error message, etc.
        }
      });

  }




}