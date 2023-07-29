import { Component, OnInit } from '@angular/core';
import { PerCalHistoryService } from 'src/app/services/per-cal-history.service';
import { SessionService } from 'src/app/services/session.service';
import { CalcHistory } from 'src/app/types/percentage-cal-history.model';

@Component({
  selector: 'app-percentage-calculator',
  templateUrl: './percentage-calculator.component.html',
  styleUrls: ['./percentage-calculator.component.css']
})
export class PercentageCalculatorComponent implements OnInit {

  calculationHistory: CalcHistory[] = [];

  constructor(
    private sessionService: SessionService,
    private calcHistoryService: PerCalHistoryService,
  ) { }

  userId = this.sessionService.getToken()._id


  ngOnInit(): void {
    this.renderHistory()
  }

  renderHistory() {
    this.calcHistoryService.getHistoryByUserId(this.userId)
      .subscribe({
        next: (history: CalcHistory[]) => {
          this.calculationHistory = history
        },
        error: error => console.error('Failed to fetch calculation history.', error)
      });
  }

  // * Calculator 1:
  xValue1!: number;
  yValue1!: number;
  result1: number | string | null = null;

  calculateXpercentAmountOfY() {

    if (typeof this.xValue1 !== 'number' || typeof this.yValue1 !== 'number' || isNaN(this.xValue1) || isNaN(this.yValue1)) {
      this.result1 = "Please enter valid numbers.";
      return;
    }

    const percentage = this.xValue1 / 100;
    const calc = (percentage * this.yValue1).toFixed(2);
    this.result1 = `${this.xValue1}% of ${this.yValue1} is: ${calc}`

    // * save the result to database and update the view:
    this.calcHistoryService.saveHistory(this.userId, this.result1)
      .subscribe({
        next: response => { this.renderHistory() },
        error: error => console.error('Failed to save calculation history.', error)
      });
  }

  // * Calcualtor 2:
  xValue2!: number;
  yValue2!: number;
  result2: number | string | null = null;

  calculatePercentageXofY() {

    if (typeof this.xValue2 !== 'number' || typeof this.yValue2 !== 'number' || isNaN(this.xValue2) || isNaN(this.yValue2)) {
      this.result2 = "Please enter valid numbers.";
      return;
    }

    const percentage = ((this.xValue2 / this.yValue2) * 100).toFixed(2);
    this.result2 = `${this.xValue2} of ${this.yValue2} is ${percentage}%`

    // * save the result to database and update the view:
    this.calcHistoryService.saveHistory(this.userId, this.result2)
      .subscribe({
        next: response => { this.renderHistory() },
        error: error => console.error('Failed to save calculation history.', error)
      });
  }

  // * Calculator 3:
  xValue3!: number;
  yValue3!: number;
  result3: number | string | null = null;

  calculateNumberIsYPercentOf() {

    if (typeof this.xValue3 !== 'number' || typeof this.yValue3 !== 'number' || isNaN(this.xValue3) || isNaN(this.yValue3)) {
      this.result3 = "Please enter valid numbers.";
      return;
    }

    const result = (this.xValue3 / (this.yValue3 / 100)).toFixed(2);
    this.result3 = `${this.xValue3} is ${this.yValue3}% of ${result}`

    // * save the result to database and update the view:
    this.calcHistoryService.saveHistory(this.userId, this.result3)
      .subscribe({
        next: response => { this.renderHistory() },
        error: error => console.error('Failed to save calculation history.', error)
      });
  }


}
