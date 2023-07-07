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
    console.log(entry);

    this.entryService.createEntry(entry)
      .subscribe({
        next: (response) => {
          
          // Entry created successfully
          // Handle any additional logic or redirection here
        },
        error: (error) => {
          // Error creating entry
          // Handle the error, display an error message, etc.
        }
      });
  }


}