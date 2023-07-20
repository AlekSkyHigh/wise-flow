import { Component } from '@angular/core';

@Component({
  selector: 'app-percentage-calculator',
  templateUrl: './percentage-calculator.component.html',
  styleUrls: ['./percentage-calculator.component.css']
})
export class PercentageCalculatorComponent {

  xValue1!: number;
  yValue1!: number;
  result1: number | string | null = null;

  calculateXpercentAmountOfY() {
    const percentage = this.xValue1 / 100;
    const calc = percentage * this.yValue1;
    this.result1 = `${this.xValue1}% of ${this.yValue1} is: ${calc}`
  }

  xValue2!: number;
  yValue2!: number;
  result2: number | string | null = null;

  calculatePercentageXofY() {
    const percentage = (this.xValue2 / this.yValue2) * 100;
    this.result2 = percentage.toFixed(2);
  }
}
