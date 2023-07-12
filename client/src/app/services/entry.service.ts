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

  updateUserBalance(userId: string, amount: number, type: string, deleted: boolean): Observable<number> {
    const url = `${environment.apiUrl}users/${userId}/balance`;
    const balanceChange = (type === 'income') ? amount : -amount;
    return this.http.put<number>(url, { balanceChange, type, deleted }); // Passes `type` to the request body
  }
  
  fetchUserBalance(userId: string) {
    const url = `${environment.apiUrl}users/${userId}/balance`;
    return this.http.get<number>(url);
  }

  deleteEntry(entryId: string): Observable<any> {
    const url = `${environment.apiUrl}entries/${entryId}`;
    return this.http.delete(url);
  }
  
  
}
