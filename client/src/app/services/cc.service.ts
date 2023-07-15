import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CcService {

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + 'currency-converter/currencies')
  }

  convertCurrency(amount: number, targetCurrency: string): Observable<number> {
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('targetCurrency', targetCurrency);

    return this.http.get<number>(environment.apiUrl + 'currency-converter/convert', { params });
  }
}
