import { Component } from '@angular/core';
import { CcService } from 'src/app/services/cc.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {
  amount!: number;
  targetCurrency!: string;
  convertedAmount!: string | null;
  currencies!: string[];

  constructor(private currencyService: CcService) { }

  ngOnInit() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.currencyService.getCurrencies().subscribe({
      next: (response: string[]) => {
        this.currencies = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  convertCurrency() {
    if (this.amount && this.targetCurrency) {
      this.currencyService.convertCurrency(this.amount, this.targetCurrency).subscribe({
        next: (response: any) => {
          const conversionRate = response[this.targetCurrency];
          if (conversionRate !== undefined) {
            const convertedAmount = this.amount * conversionRate;
            this.convertedAmount = convertedAmount.toFixed(2);
          } else {
            console.error('Invalid conversion rate:', response);
            this.convertedAmount = null;
          }
        },
        error: (error) => {
          console.error(error);
          this.convertedAmount = null;
        }
      });
    } else {
      this.convertedAmount = null;
    }
  }

}
