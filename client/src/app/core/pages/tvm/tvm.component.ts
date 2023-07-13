import { Component } from '@angular/core';

@Component({
  selector: 'app-tvm',
  templateUrl: './tvm.component.html',
  styleUrls: ['./tvm.component.css']
})
export class TvmComponent {

  presentValue!: number;
  payments!: number;
  futureValue!: string | undefined;
  annualRate!: number;
  periods!: number;
  selectedMode: string = 'Beginning';
  selectedCompounding: string = 'Annually';
  instructionsVisible: boolean = false;

  toggleInstructions() {
    this.instructionsVisible = !this.instructionsVisible;
  }

  calculateFutureValue(presentValue: number, payments: number, annualRate: number, periods: number
  ): string {

    const isEnd = this.selectedMode === 'End';
    const compoundingChoice = this.selectedCompounding;

    if (compoundingChoice === 'Annualy') {
      const annualRateDecimal = annualRate / 100;
      const futureValue =
        Math.abs(presentValue) * Math.pow(1 + annualRateDecimal, periods) -
        payments *
        ((Math.pow(1 + annualRateDecimal, periods) - 1) / annualRateDecimal) *
        (1 + (isEnd ? 0 : annualRateDecimal));

      this.futureValue = futureValue.toFixed(2);

    } else if (compoundingChoice === 'Monthly') {
      const monthlyRate = (annualRate / 12) / 100;
      const futureValue =
        Math.abs(presentValue) * Math.pow(1 + monthlyRate, periods) -
        payments *
        ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate) *
        (1 + (isEnd ? 0 : monthlyRate));

      this.futureValue = futureValue.toFixed(2);

    } else if (compoundingChoice === 'Semiannually') {
      const semiAnnualRate = (annualRate / 2) / 100;
      const futureValue =
        Math.abs(presentValue) *
        Math.pow(1 + semiAnnualRate, periods) -
        payments *
        ((Math.pow(1 + semiAnnualRate, periods) - 1) / semiAnnualRate) *
        (1 + (isEnd ? 0 : semiAnnualRate));

      this.futureValue = futureValue.toFixed(2);

    } else if (compoundingChoice === 'Quarterly') {
      const quarterlyRate = (annualRate / 4) / 100;
      const futureValue =
        Math.abs(presentValue) *
        Math.pow(1 + quarterlyRate, periods) -
        payments *
        ((Math.pow(1 + quarterlyRate, periods) - 1) / quarterlyRate) *
        (1 + (isEnd ? 0 : quarterlyRate));

      this.futureValue = futureValue.toFixed(2);
    }

    // Return a default value if no case matches
    return '0.00';
  }

}
