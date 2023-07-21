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
    const calc = (percentage * this.yValue1).toFixed(2);
    this.result1 = `${this.xValue1}% of ${this.yValue1} is: ${calc}`
  }

  xValue2!: number;
  yValue2!: number;
  result2: number | string | null = null;

  calculatePercentageXofY() {
    const percentage = ((this.xValue2 / this.yValue2) * 100).toFixed(2);
    this.result2 = `${this.xValue2} of ${this.yValue2} is ${percentage}%` 
  }

  xValue3!: number;
  yValue3!: number;
  result3: number | string | null = null;

  calculateNumberIsYPercentOf() {
    // const percentage = ((this.xValue3 / this.yValue3) * 100).toFixed(2);
    // this.result3 = `${this.xValue3} of ${this.yValue3} is ${percentage}%` 

    const result = (this.xValue3 / (this.yValue3 / 100)).toFixed(2);
    this.result3 = `${this.xValue3} is ${this.yValue3}% of ${result}`
  }
}
