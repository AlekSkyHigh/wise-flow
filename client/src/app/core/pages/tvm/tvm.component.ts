import { Component } from '@angular/core';

@Component({
  selector: 'app-tvm',
  templateUrl: './tvm.component.html',
  styleUrls: ['./tvm.component.css']
})
export class TvmComponent {

  presentValue!: number;
  payments!: number;
  futureValue!: number;
  annualRate!: number;
  periods!: number;
  selectedMode: string = 'Beginning';
  selectedCompounding: string = 'Annually';
  instructionsVisible: boolean = false;

  toggleInstructions() {
    this.instructionsVisible = !this.instructionsVisible;
  }

  calculateFutureValue(presentValue: number, payments: number, annualRate: number, periods: number): string {

    const isEnd = this.selectedMode === 'End';
    const compoundingChoice = this.selectedCompounding;

    if (compoundingChoice === 'Annualy') {
      const annualRateDecimal = annualRate / 100;
      const futureValue =
        Math.abs(presentValue) * Math.pow(1 + annualRateDecimal, periods) -
        payments *
        ((Math.pow(1 + annualRateDecimal, periods) - 1) / annualRateDecimal) *
        (1 + (isEnd ? 0 : annualRateDecimal));

      this.futureValue = Number(futureValue.toFixed(2));

    } else if (compoundingChoice === 'Monthly') {
      const monthlyRate = (annualRate / 12) / 100;
      const futureValue =
        Math.abs(presentValue) * Math.pow(1 + monthlyRate, periods) -
        payments *
        ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate) *
        (1 + (isEnd ? 0 : monthlyRate));

      this.futureValue = Number(futureValue.toFixed(2));

    } else if (compoundingChoice === 'Semiannually') {
      const semiAnnualRate = (annualRate / 2) / 100;
      const futureValue =
        Math.abs(presentValue) *
        Math.pow(1 + semiAnnualRate, periods) -
        payments *
        ((Math.pow(1 + semiAnnualRate, periods) - 1) / semiAnnualRate) *
        (1 + (isEnd ? 0 : semiAnnualRate));

      this.futureValue = Number(futureValue.toFixed(2));


    } else if (compoundingChoice === 'Quarterly') {
      const quarterlyRate = (annualRate / 4) / 100;
      const futureValue =
        Math.abs(presentValue) *
        Math.pow(1 + quarterlyRate, periods) -
        payments *
        ((Math.pow(1 + quarterlyRate, periods) - 1) / quarterlyRate) *
        (1 + (isEnd ? 0 : quarterlyRate));

      this.futureValue = Number(futureValue.toFixed(2));

    }

    // Return a default value if no case matches
    return '0.00';
  }


  calculatePayments(presentValue: number, futureValue: number, interestRate: number, periods: number): string {

    const isEnd = this.selectedMode === 'End';
    const compoundingChoice = this.selectedCompounding;

    if (compoundingChoice == "Annualy") {

      interestRate /= 100;
      presentValue = -presentValue;

      if (isEnd) {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods)));
        this.payments = Number(annuity.toFixed(2));
      } else {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods))) / (1 + interestRate);
        this.payments = Number(annuity.toFixed(2));
      }

    } else if (compoundingChoice == "Monthly") {

      interestRate = (interestRate / 12) / 100;
      presentValue = -presentValue;

      if (isEnd) {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods)));
        this.payments = Number(annuity.toFixed(2));
      } else {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods))) / (1 + interestRate);
        this.payments = Number(annuity.toFixed(2));
      }

    } else if (compoundingChoice == "Semiannually") {

      interestRate = (interestRate / 2) / 100;
      presentValue = -presentValue;

      if (isEnd) {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods)));
        this.payments = Number(annuity.toFixed(2));
      } else {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods))) / (1 + interestRate);
        this.payments = Number(annuity.toFixed(2));
      }

    } else if (compoundingChoice == "Quarterly") {

      interestRate = (interestRate / 4) / 100;
      presentValue = -presentValue;

      if (isEnd) {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods)));
        this.payments = Number(annuity.toFixed(2));
      } else {
        const futureValueWithInterest = futureValue * Math.pow(1 + interestRate, -periods);
        const annuity = -(futureValueWithInterest - presentValue) * (interestRate / (1 - Math.pow(1 + interestRate, -periods))) / (1 + interestRate);
        this.payments = Number(annuity.toFixed(2));
      }

    }

    // Return a default value if no case matches
    return '0.00';
  }


}
