import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(private http: HttpClient) { }

  createEntry(entry: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'entries/create', entry);
  }
  
  // TODO
  // getBalance(): Observable<number> {
  //   return this.http.get<number>(environment.apiUrl + 'users/balance');
  // }
}
