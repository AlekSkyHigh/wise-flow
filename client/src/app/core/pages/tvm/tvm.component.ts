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

  calculatePeriods(presentValue: number, payment: number, featureValue: number, interest: number): string {

    const isEnd = this.selectedMode === 'End';
    const compoundingChoice = this.selectedCompounding;

    if (compoundingChoice == "Annualy") {

      const pv = -presentValue;
      const pmt = -payment;
      const rate = interest / 100;

      if (isEnd) {
        const PVadj = pv * (1 + rate); // adjust the present value for the interest earned during the year
        const FVadj = featureValue - pmt; // subtract the payment from the future value

        const periodsNeeded = Math.log((FVadj * rate + pmt * rate + pmt) / (pmt * rate + PVadj * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number((periodsNeeded + 1).toFixed(2)); // add 1 to account for the payment made at the end of the year

      } else {
        const periods = Math.log((featureValue * rate + pmt * rate + pmt) / (pmt * rate + pv * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number(periods.toFixed(2));
      }

    } else if (compoundingChoice == "Monthly") {

      const pv = -presentValue;
      const pmt = -payment;
      const rate = (interest / 12) / 100;

      if (isEnd) {
        const PVadj = pv * (1 + rate);
        const FVadj = featureValue - pmt;

        const periodsNeeded = Math.log((FVadj * rate + pmt * rate + pmt) / (pmt * rate + PVadj * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number((periodsNeeded + 1).toFixed(2));

      } else {
        const periodsNeeded = Math.log((featureValue * rate + pmt * rate + pmt) / (pmt * rate + pv * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number(periodsNeeded.toFixed(2));
      }

    } else if (compoundingChoice == "Semiannually") {

      const pv = -presentValue;
      const pmt = -payment;
      const rate = (interest / 2) / 100;

      if (isEnd) {
        const PVadj = pv * (1 + rate);
        const FVadj = featureValue - pmt;

        const periodsNeeded = Math.log((FVadj * rate + pmt * rate + pmt) / (pmt * rate + PVadj * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number((periodsNeeded + 1).toFixed(2));

      } else {
        const periodsNeeded = Math.log((featureValue * rate + pmt * rate + pmt) / (pmt * rate + pv * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number(periodsNeeded.toFixed(2));
      }

    } else if (compoundingChoice == "Quarterly") {

      const pv = -presentValue;
      const pmt = -payment;
      const rate = (interest / 4) / 100;

      if (isEnd) {
        const PVadj = pv * (1 + rate);
        const FVadj = featureValue - pmt;

        const periodsNeeded = Math.log((FVadj * rate + pmt * rate + pmt) / (pmt * rate + PVadj * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number((periodsNeeded + 1).toFixed(2));

      } else {
        const periodsNeeded = Math.log((featureValue * rate + pmt * rate + pmt) / (pmt * rate + pv * rate + pmt)) / Math.log(1 + rate);
        this.periods = Number(periodsNeeded.toFixed(2));
      }

    }
    // Return a default value if no case matches
    return '0.00';
  }
}
